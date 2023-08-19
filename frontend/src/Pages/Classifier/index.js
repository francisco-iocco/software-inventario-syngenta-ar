import { Content } from "./styles";
import NewClassificationForm from "components/NewClassificationForm";
import Nav from "components/Nav";

export default function Classifier() {
  return (
    <>
      <Content>
        <NewClassificationForm />
      </Content>
      <Nav />
    </>
  );
}
