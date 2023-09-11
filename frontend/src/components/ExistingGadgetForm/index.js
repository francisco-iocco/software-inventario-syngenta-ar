import { useEffect, useState } from "react";
import { IconMinus, IconPlus, IconEqual } from "@tabler/icons-react";
import {
  Form,
  UserInput,
  AmountContainer,
  InputContainer,
  GadgetDetails,
} from "./styles";
import useHandleGadgets from "hooks/useHandleGadgets";
import Spinner from "components/Spinner";

export default function ExistingGadgetForm({ action, gadget, onClose }) {
  const [givenQuantity, setGivenQuantity] = useState(0);
  const [resultantQuantity, setResultantQuantity] = useState(0);
  const [stockError, setStockError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { updateGadget, updateGadgets, isLoading, error, isSuccess } =
    useHandleGadgets();

  const toggleSuccess = () => setShowSuccess(!showSuccess);
  const toggleError = () => setShowError(!showError);

  useEffect(() => {
    // Reset everything in case action changes to 'add' or 'deliver'
    setStockError("");
    setResultantQuantity(gadget.ownQuantity);
    setGivenQuantity("");
  }, [action]);

  useEffect(() => {
    isSuccess && toggleSuccess();
    error && toggleError();

    return () => isSuccess && updateGadgets();
  }, [isSuccess, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      id: gadget._id,
      [action === "add" ? "ownQuantity" : "givenQuantity"]: givenQuantity,
    };
    updateGadget(params);
  };

  const handleInput = ({ target: { value } }) => {
    // Add or substract the given amount to our own devices
    // Depending on the action ('add' or 'deliver')
    setGivenQuantity(value);
    const AmountToCalculate = parseInt(action === "add" ? value : value * -1);
    const res = gadget.ownQuantity + (AmountToCalculate || 0);
    if (res >= 0) {
      stockError && setStockError("");
      setResultantQuantity(res);
    } else {
      setStockError("¡Sin stock!");
      setResultantQuantity(0);
    }
  };

  if (isLoading) {
    return (
      <Form>
        <Spinner />
      </Form>
    );
  }

  return (
    <Form onSubmit={handleSubmit} action={action}>
      {!isLoading && showSuccess && (
        <p onAnimationEnd={onClose} className="success">
          ¡Solicitud exitosa!
        </p>
      )}
      {!isLoading && showError && (
        <p onAnimationEnd={toggleError} className="error">
          {error}
        </p>
      )}
      {!showSuccess && !showError && (
        <>
          <GadgetDetails>
            <p>{gadget.name}</p>
            <img src={`data:image/png;base64,${gadget.image}`} alt="Gadget" />
          </GadgetDetails>
          <UserInput>
            <AmountContainer>
              <span>{gadget.ownQuantity}</span>
              <p>Stock</p>
            </AmountContainer>
            <InputContainer>
              <div>{action === "add" ? <IconPlus /> : <IconMinus />}</div>
              <div>
                <input
                  type="number"
                  value={givenQuantity}
                  onChange={handleInput}
                />
                {stockError && <p>{stockError}</p>}
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
          <button type="submit" disabled={stockError}>
            Hecho
          </button>
        </>
      )}
    </Form>
  );
}
