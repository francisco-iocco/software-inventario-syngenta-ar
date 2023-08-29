import { Logo, Container, Header } from "./styles.js";
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
                src="https://1000marcas.net/wp-content/uploads/2022/06/Syngenta-Logo-tumb.png"
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
