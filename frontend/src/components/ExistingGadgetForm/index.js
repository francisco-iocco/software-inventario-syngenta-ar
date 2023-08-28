import { useEffect, useState } from "react";
import {
  Form,
  UserInput,
  AmountContainer,
  InputContainer,
  GadgetDetails,
} from "./styles";
import { IconMinus, IconPlus, IconEqual } from "@tabler/icons-react";
import useHandleGadgets from "hooks/useHandleGadgets";

export default function ExistingGadgetForm({ action, gadget, onClose }) {
  const [givenQuantity, setGivenQuantity] = useState(0);
  const [resultantQuantity, setResultantQuantity] = useState(0);
  const [error, setError] = useState("");
  const { updateGadget } = useHandleGadgets();

  useEffect(() => {
    // Reset everything in case action changes to 'add' or 'deliver'
    setError("");
    setResultantQuantity(gadget.ownedQuantity);
    setGivenQuantity("");
  }, [action]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = { 
      id: gadget._id,
      [action === "add" ? "ownedQuantity" : "givenQuantity"]: givenQuantity
    };
    await updateGadget(params);
    onClose();
  }

  const handleInput = ({ target: { value } }) => {
    // Add or substract the given amount to our own devices
    // Depending on the action ('add' or 'deliver')
    setGivenQuantity(value);
    const AmountToCalculate = parseInt(action === "add" ? value : value * -1);
    const res = gadget.ownedQuantity + (AmountToCalculate || 0);
    if(res >= 0) {
      error && setError("");
      setResultantQuantity(res);
    } else {
      setError("¡Sin stock!");
      setResultantQuantity(0);
    }
  }

  return (
    <Form onSubmit={handleSubmit} action={action}>
      <GadgetDetails>
        <p>{gadget.name}</p>
        <img
          src={`data:image/png;base64,${gadget.image}`}
          alt="Gadget"
        />
      </GadgetDetails>
      <UserInput>
        <AmountContainer>
          <span>{gadget.ownedQuantity}</span>
          <p>Stock</p>
        </AmountContainer>
        <InputContainer>
          <div>
            {action === "add"
              ? <IconPlus />
              : <IconMinus />}
          </div>
          <div>
            <input
              type="number"
              value={givenQuantity}
              onChange={handleInput}
            />
            {error && <p>{error}</p>}
          </div>
          <div>
            <IconEqual />
          </div>
        </InputContainer>
        <AmountContainer>
          <span>{resultantQuantity}</span>
          <p>Resultado</p>
        </AmountContainer>
      </UserInput>
      <button type="submit" disabled={error}>Hecho</button>
    </Form>
  );
}
