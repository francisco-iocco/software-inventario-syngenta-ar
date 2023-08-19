import { useEffect, useRef, useState } from "react";
import {
  Form,
  UserInput,
  AmountContainer,
  InputContainer,
  GadgetDetails,
} from "./styles";
import { IconMinus, IconPlus, IconEqual } from "@tabler/icons-react";

export default function ExistingGadgetForm({ action }) {
  const ownQuantity = useRef(null);
  const [givenQuantity, setGivenQuantity] = useState(0);
  const [resultantQuantity, setResultantQuantity] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    // Reset everything in case action changes to 'add' or 'deliver'
    setError("");
    setResultantQuantity(parseInt(ownQuantity.current.innerText));
    setGivenQuantity("");
  }, [action])

  const handleInput = ({ target: { value } }) => {
    // Add or substract the given amount to our own devices
    // Depending on the action ('add' or 'deliver')
    setGivenQuantity(value);
    const ownedDevices = parseInt(ownQuantity.current.innerText);
    const AmountToCalculate = parseInt(action === "add" ? value : value * -1);
    const res = ownedDevices + (AmountToCalculate || 0);
    if(res >= 0) {
      error && setError("");
      setResultantQuantity(res);
    } else {
      setError("¡Sin stock!");
      setResultantQuantity(0);
    }
  }

  return (
    <Form action={action}>
      <GadgetDetails>
        <p>Nombre</p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWszFsdqq3l48cIQ_wQoGbs9E1SpNWsVCxdvMkDrGRCQTkSfLXYrKKqFhzRoIORibKtw&usqp=CAU"
          alt="Gadget"
        />
      </GadgetDetails>
      <UserInput>
        <AmountContainer>
          <span ref={ownQuantity}>15</span>
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
