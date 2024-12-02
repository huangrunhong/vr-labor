import { HashRouter, Route, Routes } from "react-router-dom";
import { createXRStore } from "@react-three/xr";

import HomePage from "./pages/HomePage";
import PrinterPage from "./pages/PrinterPage";
import Scene from "./components/Scene";

import "./styles/app.scss";

const homeStore = createXRStore({
  hand: false,
  controller: { teleportPointer: false, rayPointer: true },
});

const printerStore = createXRStore({
  hand: false,
  controller: { teleportPointer: false, rayPointer: true },
});

const App = () => (
  <HashRouter>
    <Routes>
      <Route
        path="/"
        element={
          <Scene
            store={homeStore}
            origin={[-6, -1]}
            environmentFile="/vr-labor/Outside_background_29112024.exr"
            backgroundFile="/vr-labor/Outside_background_29112024.exr"
            environmentIntensity={0.5}
            backgroundIntensity={0}
          >
            <HomePage />
          </Scene>
        }
      />
      <Route
        path="/printer"
        element={
          <Scene
            store={printerStore}
            origin={[0, 0]}
            environmentFile="/vr-labor/studio_small_08_1k.hdr"
            backgroundFile="/vr-labor/TUM_Additive_room_background.exr"
            environmentIntensity={0.4}
            backgroundIntensity={0}
          >
            <PrinterPage />
          </Scene>
        }
      />
    </Routes>
  </HashRouter>
);

export default App;
