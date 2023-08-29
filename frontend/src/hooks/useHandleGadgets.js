import { useContext } from "react";
import GadgetsContext from "contexts/GadgetsContext";

export default function useHandleGadgets() {
  const { updateGadgets } = useContext(GadgetsContext);

  const getGadgetByBarcode = async  ({ barcode = "" } = {}) => {
    let gadget = await fetch(`http://192.168.11.81:4000/gadgets?barcode=${barcode}`);
    gadget = await gadget.json();
    if(gadget.err) return gadget;
    const image = new Uint8Array(gadget.image.data.data);
    const base64Image = btoa(image.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, ""));
    return { ...gadget, image: base64Image };
  }

  // Send gadgets to the backend and obtain all the gadgets
  // (including the new one) once it has finished
  const postGadget = async ({ image, name, barcode, quantity }) => {
    const formData = new FormData();
    formData.append("image", image, image.name);
    formData.append("name", name);
    formData.append("barcode", barcode);
    formData.append("ownedQuantity", quantity);
    let response = await fetch("http://192.168.11.81:4000/gadgets", {
      method: "POST",
      body: formData,
    });
    response = await response.json();
    if (!response.err) {
      await updateGadgets();
    }
  };

  const updateGadget = async ({ id, ownedQuantity, givenQuantity }) => {
    if(ownedQuantity || givenQuantity) {
      const body = {};
      if(ownedQuantity) body.ownedQuantity = ownedQuantity;
      if(givenQuantity) body.givenQuantity = givenQuantity;
      let response = await fetch(`http://192.168.11.81:4000/gadgets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (response.status === 204) {
        await updateGadgets();
      }
    }
  }

  return {
    updateGadget,
    postGadget,
    getGadgetByBarcode
  };
}
