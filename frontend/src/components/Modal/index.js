import { createPortal } from "react-dom";
import { StyledModal, Container } from "./styles";

function Modal() {
  return (
    <StyledModal>
      <Container>
        <div></div>
      </Container>
    </StyledModal>
  );
}

export default function ModalPortal() {
  return createPortal(<Modal />, document.getElementById("modal"));
}
