import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "Pages/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
