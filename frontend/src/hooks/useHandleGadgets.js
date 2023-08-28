import { useContext } from "react";
import GadgetsContext from "contexts/GadgetsContext";

export default function useHandleGadgets() {
  const { setGadgets } = useContext(GadgetsContext);

  // Obtain gadgets and arrange their information into an object
  const getGadgets = async ({ barcode = "" } = {}) => {
    let url = "http://localhost:4000/gadgets";
    if (barcode) url += `?barcode=${barcode}`;
    let gadgets = await fetch(url);
    gadgets = await gadgets.json();
    gadgets = gadgets.map((gadget) => {
      const image = new Uint8Array(gadget.image.data.data);
      const base64Image = btoa(image.reduce((data, byte) => {
        return data + String.fromCharCode(byte);
      }, ""));
      return { ...gadget, image: base64Image }
    });
    setGadgets(gadgets);
  };

  // Send gadgets to the backend and obtain all the gadgets
  // (including the new one) once it has finished
  const postGadget = async ({ image, name, barcode, quantity }) => {
    const formData = new FormData();
    formData.append("image", image, image.name);
    formData.append("name", name);
    formData.append("barcode", barcode);
    formData.append("ownedQuantity", quantity);
    let response = await fetch("http://localhost:4000/gadgets", {
      method: "POST",
      body: formData,
    });
    response = await response.json();
    if (!response.err) {
      await getGadgets();
    }
  };

  const updateGadget = async ({ id, ownedQuantity, givenQuantity }) => {
    if(ownedQuantity || givenQuantity) {
      const body = {};
      if(ownedQuantity) body.ownedQuantity = ownedQuantity;
      if(givenQuantity) body.givenQuantity = givenQuantity;
      let response = await fetch(`http://localhost:4000/gadgets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (response.status === 204) {
        await getGadgets();
      }
    }
  }

  return {
    getGadgets,
    postGadget,
    updateGadget
  };
}
