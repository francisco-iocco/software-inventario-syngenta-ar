import { Gadgets } from "./styles";
import Gadget from "components/Gadget";

export default function ListOfGadgets({ gadgets }) {
  return (
    <Gadgets>
      {gadgets.map(() => (
        <Gadget />
      ))}
    </Gadgets>
  );
}
