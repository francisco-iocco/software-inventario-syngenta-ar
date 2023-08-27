import { useContext } from "react";
import GadgetsContext from "contexts/GadgetsContext";
import { Gadgets } from "./styles";
import Gadget from "components/Gadget";

export default function ListOfGadgets() {
  const { gadgets } = useContext(GadgetsContext);

  return (
    <Gadgets>
      {gadgets.map((gadget, index) => (
        <Gadget key={index} gadget={gadget} />
      ))}
    </Gadgets>
  );
}
