import { Canvas } from "@react-three/fiber";
import { Environment, Stats } from "@react-three/drei";
import { IfSessionModeSupported, XR, createXRStore } from "@react-three/xr";

import Camera from "./components/Camera";
import Room from "./components/Room";

import "./styles/app.scss";

const store = createXRStore();

const App = () => (
  <main>
    <IfSessionModeSupported mode="immersive-vr">
      <div className="vr">
        <button onClick={() => store.enterVR()}>Enter VR</button>
      </div>
    </IfSessionModeSupported>

    <Canvas>
      <XR store={store}>
        <Environment files="/vr-labor/berlin.hdr" background />
        <Camera />
        <Room />
        <Stats />
      </XR>
    </Canvas>
  </main>
);

export default App;
