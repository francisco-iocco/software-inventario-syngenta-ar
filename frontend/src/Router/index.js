import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "Pages/Home";
import Barcode from "Pages/Barcode";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/scanner" element={<Barcode />} />
      </Routes>
    </BrowserRouter>
  );
}
