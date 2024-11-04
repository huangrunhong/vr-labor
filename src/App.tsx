import { Canvas } from "@react-three/fiber";
import { Environment, Stats } from "@react-three/drei";
import {
  IfSessionModeSupported,
  TeleportTarget,
  XR,
  XROrigin,
  createXRStore,
} from "@react-three/xr";

import Camera from "./components/Camera";
import Room from "./components/Room";

import "./styles/app.scss";
import { useState } from "react";
import { Vector3 } from "three";

const store = createXRStore({
  hand: { teleportPointer: true },
  controller: { teleportPointer: true },
});

const App = () => {
  const [position, setPosition] = useState(new Vector3(-6, 1.6, -1));

  return (
    <main>
      <IfSessionModeSupported mode="immersive-vr">
        <div className="vr">
          <button onClick={() => store.enterVR()}>Enter VR</button>
        </div>
      </IfSessionModeSupported>
      <Canvas>
        <XR store={store}>
          <XROrigin position={position} />
          <Environment files="/vr-labor/berlin.hdr" background />
          <Camera />
          <TeleportTarget onTeleport={setPosition}>
            <Room />
          </TeleportTarget>
          <Stats />
        </XR>
      </Canvas>
    </main>
  );
};

export default App;
