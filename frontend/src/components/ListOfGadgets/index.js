import { useContext, useEffect, useState } from "react";
import GadgetsContext from "contexts/GadgetsContext";
import { Gadgets, LoadingGadget } from "./styles";
import Gadget from "components/Gadget";

export default function ListOfGadgets() {
  const { gadgets, filterByName, isLoading, error } = useContext(GadgetsContext);
  const [renderGadgets, setRenderGadgets] = useState([]);

  useEffect(() => {
    if (gadgets) {
      let gadgetsToRender = gadgets;
      if (filterByName) {
        gadgetsToRender = gadgetsToRender.filter((gadget) =>
          gadget.name.toLowerCase().includes(filterByName.toLowerCase())
        );
      }
      setRenderGadgets(gadgetsToRender);
    }
  }, [filterByName, gadgets]);

  return (
    <Gadgets>
      {error && <p className="error">{error}</p>}
      {!isLoading && gadgets.length === 0 && !error && <p>¡No hay dispositivos!</p>}
      {isLoading && (
        <>
          <LoadingGadget>
            <div></div>
          </LoadingGadget>
          <LoadingGadget>
            <div></div>
          </LoadingGadget>
          <LoadingGadget>
            <div></div>
          </LoadingGadget>
        </>
      )}
      {!isLoading && renderGadgets.map((gadget, index) => (
        <Gadget gadget={gadget} key={index} />
      ))}
    </Gadgets>
  );
}
