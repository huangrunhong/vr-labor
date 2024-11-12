import { HashRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PrinterPage from "./pages/PrinterPage";
import Scene from "./components/Scene";

import "./styles/app.scss";

const App = () => (
  <Scene>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/printer" element={<PrinterPage />} />
      </Routes>
    </HashRouter>
  </Scene>
);

export default App;
