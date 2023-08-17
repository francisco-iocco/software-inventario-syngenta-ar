import { useEffect, useState } from "react";
import { Logo, Container, Header } from "./styles.js";
import LoadingPage from "Pages/Loading";
import ListOfGadgets from "components/ListOfGadgets";
import Nav from "components/Nav";
import SearchBar from "components/SearchBar";

// LoadingPage component disappears itself when 'isLoading' changes its state
// allowing a smooth transition between pages

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [animation, setAnimation] = useState(false);

  // This 'setTimeout' is used as an approach
  // so that it's similar to waiting for a HTTP request to the server

  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 1000);
  }, []);

  return (
    <>
      <LoadingPage
        animation={animation}
        isLoading={isLoading}
        handleIsLoading={setIsLoading}
      />
      {!isLoading && (
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
            <ListOfGadgets gadgets={[{}, {}, {}, {}, {}, {}]} />
          </Container>
          <Nav />
        </>
      )}
    </>
  );
}
