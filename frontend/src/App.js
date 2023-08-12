import { useEffect, useState } from "react";
import LoadingPage from "Pages/Loading";
import Home from "Pages/Home";

// LoadingPage component disappears itself when 'isLoading' changes its state
// allowing a smooth transition between pages

function App() {
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
    <div className="App">
      <LoadingPage
        animation={animation}
        isLoading={isLoading}
        handleIsLoading={setIsLoading}
      />
      {!isLoading && <Home />}
    </div>
  );
}

export default App;
