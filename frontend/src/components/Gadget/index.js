import { useState } from "react";
import { Container, Image, Name, Details } from "./styles";
import Modal from "components/Modal";

export default function Gadget() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Container onClick={() => setShowModal(true)}>
        <Image>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWszFsdqq3l48cIQ_wQoGbs9E1SpNWsVCxdvMkDrGRCQTkSfLXYrKKqFhzRoIORibKtw&usqp=CAU"
            alt="Gadget"
          />
        </Image>
        <Name>Nombre</Name>
        <Details type="stock">
          <p>Stock</p>
          <span>15</span>
        </Details>
        <Details type="delivered">
          <p>Entregados</p>
          <span>7</span>
        </Details>
      </Container>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
}
