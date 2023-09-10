import { Logo, Container, Header } from "./styles.js";
import LogoSyn from "assets/Logo.png";
import ListOfGadgets from "components/ListOfGadgets";
import Nav from "components/Nav";
import SearchBar from "components/SearchBar";

export default function Home() {
  return (
    <>
      <Container>
        <Header>
          <div>
            <Logo>
              <img
                src={LogoSyn}
                alt="Logo de Syngenta"
              />
            </Logo>
            <SearchBar />
          </div>
        </Header>
        <ListOfGadgets />
      </Container>
      <Nav />
    </>
  );
}
