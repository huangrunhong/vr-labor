import { Canvas } from "@react-three/fiber";
import { Environment, Stats } from "@react-three/drei";
import { createXRStore, IfSessionModeSupported, XR } from "@react-three/xr";

import Camera from "./Camera";
import Locomotion from "./Locomotion";

const store = createXRStore({
  hand: false,
  controller: { teleportPointer: false, rayPointer: true },
});

const Scene = ({ children }: React.PropsWithChildren) => (
  <main>
    <IfSessionModeSupported mode="immersive-vr">
      <div className="vr">
        <button onClick={() => store.enterVR()}>Enter VR</button>
      </div>
    </IfSessionModeSupported>
    <Canvas>
      <XR store={store}>
        <Camera x={-6} y={1.6} z={-1} />
        <Locomotion x={-6} y={0} z={-1} />
        {children}
        <Environment files="/vr-labor/berlin.hdr" background />
        <Stats />
      </XR>
    </Canvas>
  </main>
);

export default Scene;
