import { useState } from "react";
import { createPortal } from "react-dom";
import { StyledModal, Container, Actions, Button, CloseContainer } from "./styles";
import { IconX } from "@tabler/icons-react";
import ExistingGadgetForm from "components/ExistingGadgetForm";

function Modal({ onClose, gadget }) {
  const [action, setAction] = useState("add");
  const [animation, setAnimation] = useState("");

  const handleClose = () => {
    setAnimation("close-modal");
    // setTimeout to wait for animation before closing
    setTimeout(onClose, 500);
  };

  return (
    <StyledModal $animation={animation}>
      <Container $animation={animation}>
        <div>
          <Actions>
            <Button
              $isactive={action === "add" ? "true" : "false"}
              onClick={() => setAction("add")}
              $desc="add"
            >
              Agregar
            </Button>
            <Button
              $isactive={action === "deliver" ? "true" : "false"}
              onClick={() => setAction("deliver")}
              $desc="deliver"
            >
              Entregar
            </Button>
            <CloseContainer>
              <button>
                <IconX size="1em" onClick={handleClose} />
              </button>
            </CloseContainer>
          </Actions>
          <ExistingGadgetForm action={action} gadget={gadget} onClose={onClose} />
        </div>
      </Container>
    </StyledModal>
  );
}

// Creating portal so that modal renders above everything
export default function ModalPortal({ onClose, gadget }) {
  return createPortal(
    <Modal onClose={onClose} gadget={gadget} />,
    document.getElementById("modal")
  );
}
