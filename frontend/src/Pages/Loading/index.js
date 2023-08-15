import { useState, useEffect } from "react";
import { Section, TransitionBlock } from "./styles";
import Spinner from "components/Spinner";

// TransitionBlock is the element whose animation covers the client view
// allowing changing pages without the user being aware of it

export default function LoadingPage({ animation, isLoading, handleIsLoading }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setShow(false), 1000);
    }
  }, [isLoading]);

  if (show) {
    return (
      <>
        <TransitionBlock
          animation={animation}
          onAnimationEnd={() => handleIsLoading(false)}
        />
        {isLoading && (
          <>
            <Section>
              <img
                src="https://1000marcas.net/wp-content/uploads/2022/06/Syngenta-Logo-tumb.png"
                alt="Logo de Syngenta"
              />
            </Section>
            <Section>
              <Spinner animation={animation} />
            </Section>
          </>
        )}
      </>
    );
  }
}
