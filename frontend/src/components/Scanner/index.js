import { BrowserMultiFormatReader } from "@zxing/library";
import { useEffect, useRef } from "react";
import { Container, Redline } from "./styles";

export default function Scanner() {
  const videoRef = useRef(null);
  const reader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    reader.current.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: "environment"
        }
      },
      videoRef.current,
      (result, error) => {
        if (result) alert(result);
      }
    );
  }, []);

  return (
    <Container>
      <video ref={videoRef} />
      <Redline />
    </Container>
  );
}
