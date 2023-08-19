import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "Pages/Home";
import Barcode from "Pages/Barcode";
import Classifier from "Pages/Classifier";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/scanner" element={<Barcode />} />
        <Route path="/classifier" element={<Classifier />} />
      </Routes>
    </BrowserRouter>
  );
}
