import { useReducer } from "react";
import { Form, ImageContainer } from "./styles";
import useHandleGadgets from "hooks/useHandleGadgets";

const initialState = {
  imagePreview: "",
  image: "",
  name: "",
  barcode: 0,
  quantity: 0,
};

const actions = {
  UPDATE_IMAGE: "UPDATE_IMAGE",
  UPDATE_NAME: "UPDATE_NAME",
  UPDATE_BARCODE: "UPDATE_BARCODE",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
};

function reducer(state, action) {
  switch (action.type) {
    case actions.UPDATE_IMAGE:
      const { imagePreview, image } = action.value;
      return { ...state, imagePreview, image };
    case actions.UPDATE_NAME:
      return { ...state, name: action.value };
    case actions.UPDATE_BARCODE:
      return { ...state, barcode: action.value };
    case actions.UPDATE_QUANTITY:
      return { ...state, quantity: action.value };
    default:
      return initialState;
  }
}

export default function NewClassificationForm() {
  const [{ imagePreview, image, name, barcode, quantity }, dispatch] =
    useReducer(reducer, initialState);
  const { postGadget } = useHandleGadgets();

  const handleSubmit = async (e) => {
    e.preventDefault();
    postGadget({ image, name, barcode, quantity });
  }

  const handleFileInput = ({ target }) => {
    // Adding an image preview and the image which will be sent to the backend
    if (target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", ({ target: _target }) => {
        dispatch({
          type: actions.UPDATE_IMAGE,
          value: { imagePreview: _target.result, image: target.files[0] },
        });
      });
      reader.readAsDataURL(target.files[0]);
    }
  };

  const handleNameInput = ({ target }) => {
    dispatch({ type: actions.UPDATE_NAME, value: target.value });
  };

  const handleBarcodeInput = ({ target }) => {
    dispatch({ type: actions.UPDATE_BARCODE, value: target.value });
  };

  const handleQuantityInput = ({ target }) => {
    dispatch({ type: actions.UPDATE_QUANTITY, value: target.value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <ImageContainer $hasSrc={!!imagePreview}>
          <img src={imagePreview} alt="0" />
        </ImageContainer>
        <input type="file" id="image-input" onChange={handleFileInput} />
        <label htmlFor="image-input">Seleccioná una foto</label>
      </div>
      <div>
        <input type="text" value={name} onChange={handleNameInput} />
        <label>Nombre del dispositivo</label>
      </div>
      <div>
        <input type="number" value={barcode} onChange={handleBarcodeInput} />
        <label>Código de barras</label>
      </div>
      <div>
        <input type="number" value={quantity} onChange={handleQuantityInput} />
        <label>Cantidad</label>
      </div>
      <div>
        <button type="submit">Crear</button>
      </div>
    </Form>
  );
}
