import { createContext, useState, useEffect } from "react";

const GadgetsContext = createContext([]);

export function GadgetsContextProvider({ children }) {
  const [gadgets, setGadgets] = useState([]);
  const [filterByName, setFilterByName] = useState("");

  useEffect(() => {
    (async function() {
      let fetchedGadgets = await fetch("http://192.168.11.81:4000/gadgets");
      fetchedGadgets = await fetchedGadgets.json();
      fetchedGadgets = fetchedGadgets.map((gadget) => {
        const image = new Uint8Array(gadget.image.data.data);
        const base64Image = btoa(
          image.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, "")
        );
        return { ...gadget, image: base64Image };
      });
      setGadgets(fetchedGadgets);
    })();
  }, []);

  return (
    <GadgetsContext.Provider
      value={{
        gadgets,
        setGadgets,
        filterByName,
        setFilterByName,
      }}
    >
      {children}
    </GadgetsContext.Provider>
  );
}

export default GadgetsContext;
