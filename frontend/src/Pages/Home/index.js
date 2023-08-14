import { useEffect, useState } from "react";
import LoadingPage from "Pages/Loading";
import Nav from "components/Nav";

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
        <div>
          <div>Texto de ejemplo</div>
          <Nav />
        </div>
      )}
    </>
  );
}
