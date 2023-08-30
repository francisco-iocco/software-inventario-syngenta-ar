import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Container, Redline } from "./styles";
import Modal from "components/Modal";
import useHandleGadgets from "hooks/useHandleGadgets";

export default function Scanner() {
  const videoRef = useRef(null);
  const reader = useRef(new BrowserMultiFormatReader());
  const [showModal, setShowModal] = useState(false);
  const [gadget, setGadget] = useState(false);
  const { getGadgetByBarcode } = useHandleGadgets();
  const navigate = useNavigate();

  useEffect(() => {
    reader.current.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: "environment",
        },
      },
      videoRef.current,
      async (barcode) => {
        if(barcode) {
          const gadget = await getGadgetByBarcode({ barcode });
          if(!gadget.err) {
            setGadget(gadget);
            setShowModal(true);
          } else {
            navigate(`/classifier?barcode=${barcode}`);
          }
        }
      }
    );
    return () => reader.current.reset();
  }, []);

  return (
    <>
      <Container>
        <div>
          <video ref={videoRef} />
          <Redline />
        </div>
      </Container>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} gadget={gadget} />
      )}
    </>
  );
}
