import { Canvas } from "@react-three/fiber";
import { Environment, Stats } from "@react-three/drei";
import { IfSessionModeSupported, XR, XRStore } from "@react-three/xr";

import Camera from "./Camera";
import Locomotion from "./Locomotion";

interface SceneProps {
  children: React.ReactNode;
  origin: [number, number];
  store: XRStore;
}

const Scene = ({ children, origin, store }: SceneProps) => (
  <main>
    <IfSessionModeSupported mode="immersive-vr">
      <div className="vr">
        <button onClick={() => store.enterVR()}>Enter VR</button>
      </div>
    </IfSessionModeSupported>
    <Canvas>
      <XR store={store}>
        <Camera x={origin[0]} y={1.6} z={origin[1]} />
        <Locomotion x={origin[0]} y={0} z={origin[1]} />
        {children}
        <Environment files="/vr-labor/berlin.hdr" background />
        <Stats />
      </XR>
    </Canvas>
  </main>
);

export default Scene;