import Router from "Router";
import { GadgetsContextProvider } from "contexts/GadgetsContext";

function App() {
  return (
    <GadgetsContextProvider>
      <div className="App">
        <Router />
      </div>
    </GadgetsContextProvider>
  );
}

export default App;
