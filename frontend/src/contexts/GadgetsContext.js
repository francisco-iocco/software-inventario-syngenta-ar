import { createContext, useState, useEffect } from "react";

const GadgetsContext = createContext([]);

export function GadgetsContextProvider({ children }) {
  const [gadgets, setGadgets] = useState([]);
  const [filterByName, setFilterByName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const updateGadgets = async () => {
    setIsLoading(true);
    let gadgets = await fetch("http://192.168.11.81:4000/gadgets");
    gadgets = await gadgets.json();
    gadgets = gadgets.map((gadget) => {
      const image = new Uint8Array(gadget.image.data.data);
      const base64Image = btoa(
        image.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, "")
      );
      return { ...gadget, image: base64Image };
    });
    setGadgets(gadgets);
    setIsLoading(false);
  }

  useEffect(() => {
    (async function() {
      setIsLoading(true);
      let fetchedGadgets = await fetch("http://192.168.11.81:4000/gadgets");
      if(fetchedGadgets.status === 204) return;
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
      setIsLoading(false);
    })();
  }, []);

  return (
    <GadgetsContext.Provider
      value={{
        gadgets,
        updateGadgets,
        filterByName,
        setFilterByName,
        isLoading
      }}
    >
      {children}
    </GadgetsContext.Provider>
  );
}

export default GadgetsContext;
