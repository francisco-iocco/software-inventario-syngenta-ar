import { StyledSpinner, Frame, Cover } from "./styles";

export default function Spinner({ animation }) {
  return (
    <Frame animation={animation}>
      <Cover animation={animation} />
      <StyledSpinner />
    </Frame>
  );
}