import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import PrinterPage from "./pages/PrinterPage";

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/printer" element={<PrinterPage />} />
    </Routes>
  </HashRouter>
);

export default App;
