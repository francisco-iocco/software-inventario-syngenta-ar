import { useState } from "react";
import { Container, Image, Name, Details } from "./styles";
import Modal from "components/Modal";

export default function Gadget({ gadget }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Container onClick={() => setShowModal(true)}>
        <Image>
          <img
            src={`data:image/png;base64,${gadget.image}`}
            alt="Gadget"
          />
        </Image>
        <Name>{gadget.name}</Name>
        <Details type="stock">
          <p>Stock</p>
          <span>{gadget.ownedQuantity}</span>
        </Details>
        <Details type="delivered">
          <p>Entregados</p>
          <span>{gadget.givenQuantity}</span>
        </Details>
      </Container>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
}
