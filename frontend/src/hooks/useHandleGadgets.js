import { useContext, useState } from "react";
import GadgetsContext from "contexts/GadgetsContext";

export default function useHandleGadgets() {
  const { updateGadgets } = useContext(GadgetsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);

  const getGadgetByBarcode = async ({ barcode = "" } = {}) => {
    let gadget = await fetch(
      `${process.env.REACT_APP_API_URL}/gadgets?barcode=${barcode}`
    );
    gadget = await gadget.json();
    if (gadget.err) return gadget;
    const image = new Uint8Array(gadget.image.data.data);
    const base64Image = btoa(
      image.reduce((data, byte) => {
        return data + String.fromCharCode(byte);
      }, "")
    );
    return { ...gadget, image: base64Image };
  };

  // Send gadgets to the backend and obtain all the gadgets
  // (including the new one) once it has finished
  const postGadget = async ({ image, name, barcode, quantity }) => {
    setError(false);
    setIsSuccess(false);
    setIsLoading(true);
    const formData = new FormData();
    image && formData.append("image", image, image.name);
    formData.append("name", name);
    formData.append("barcode", barcode);
    formData.append("ownedQuantity", quantity);
    let response = await fetch(`${process.env.REACT_APP_API_URL}/gadgets`, {
      method: "POST",
      body: formData,
    });
    response = await response.json();
    if (!response.err) {
      setIsSuccess(true);
      await updateGadgets();
    } else {
      setError(response.err);
    }
    setIsLoading(false);
  };

  const updateGadget = async ({ id, ownedQuantity, givenQuantity }) => {
    setError(false);
    setIsSuccess(false);
    setIsLoading(true);
    const body = {};
    if (ownedQuantity) body.ownedQuantity = ownedQuantity;
    if (givenQuantity) body.givenQuantity = givenQuantity;
    let response = await fetch(`${process.env.REACT_APP_API_URL}/gadgets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if(response.status === 204) {
      setIsSuccess(true);
    } else {
      response = await response.json();
      response.err && setError(response.err);
    }
    setIsLoading(false);
  };

  return {
    updateGadget,
    updateGadgets,
    postGadget,
    getGadgetByBarcode,
    isLoading,
    isSuccess,
    error,
  };
}
