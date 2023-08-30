import { createContext, useState, useEffect } from "react";

const GadgetsContext = createContext([]);

export function GadgetsContextProvider({ children }) {
  const [gadgets, setGadgets] = useState([]);
  const [filterByName, setFilterByName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const updateGadgets = async () => {
    setIsLoading(true);
    let fetchedGadgets = await fetch("http://192.168.11.81:4000/gadgets");
    console.log(fetchedGadgets);
    if (fetchedGadgets.status === 204) {
      setIsLoading(false);
      return;
    }
    fetchedGadgets = await fetchedGadgets.json();
    if(fetchedGadgets.err) {
      setIsLoading(false);
      setError(fetchedGadgets.err);
      return;
    }
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
  };

  useEffect(() => { (async () => await updateGadgets())(); }, []);

  return (
    <GadgetsContext.Provider
      value={{
        gadgets,
        updateGadgets,
        filterByName,
        setFilterByName,
        isLoading,
        error
      }}
    >
      {children}
    </GadgetsContext.Provider>
  );
}

export default GadgetsContext;
