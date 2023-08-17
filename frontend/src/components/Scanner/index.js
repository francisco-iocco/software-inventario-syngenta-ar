import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Container, Redline } from "./styles";
import Modal from "components/Modal";

export default function Scanner() {
  const videoRef = useRef(null);
  const reader = useRef(new BrowserMultiFormatReader());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    reader.current.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: "environment",
        },
      },
      videoRef.current,
      (result) => {
        result && setShowModal(true);
      }
    );
  }, []);

  return (
    <>
      <Container>
        <video ref={videoRef} />
        <Redline />
      </Container>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
}
