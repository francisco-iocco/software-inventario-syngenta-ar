import { useState } from "react";
import { Form, ImageContainer } from "./styles";

export default function NewClassificationForm() {
  const [imageSrc, setImageSrc] = useState("");

  const handleInput = ({ target }) => {
    if (target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", ({ target }) =>
        setImageSrc(target.result)
      );
      reader.readAsDataURL(target.files[0]);
    }
  };

  return (
    <Form>
      <div>
        <ImageContainer $hasSrc={!!imageSrc}>
          <img src={imageSrc} alt="0" />
        </ImageContainer>
        <input type="file" id="image-input" onChange={handleInput} />
        <label htmlFor="image-input">Seleccioná una foto</label>
      </div>
      <div>
        <input type="text" />
        <label>Nombre del dispositivo</label>
      </div>
      <div>
        <input type="number" />
        <label>Código de barras</label>
      </div>
      <div>
        <input type="number" />
        <label>Cantidad</label>
      </div>
      <div>
        <button type="submit">Crear</button>
      </div>
    </Form>
  );
}
