import { useEffect, useState } from "react";
import Spinner from "components/Spinner";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 1000);
  }, []);

  return (
    <div className="App">
      {isLoading && (
        <>
          <div>
            <img
              src="https://1000marcas.net/wp-content/uploads/2022/06/Syngenta-Logo-tumb.png"
              alt=""
            />
          </div>
          <div>
            <Spinner animation={animation} onAnimationEnd={() => setIsLoading(false)} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
