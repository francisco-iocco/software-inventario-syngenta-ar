import { useEffect, useState } from "react";
import Spinner from "components/Spinner";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      // setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="App">
      {isLoading && (
        <>
          <img
            src="https://1000marcas.net/wp-content/uploads/2022/06/Syngenta-Logo-tumb.png"
            alt=""
          />
          <Spinner />
        </>
      )}
    </div>
  );
}

export default App;
