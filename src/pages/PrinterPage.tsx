import { Canvas } from "@react-three/fiber";
import {
  createXRStore,
  IfSessionModeSupported,
  PointerEvents,
  XR,
} from "@react-three/xr";
import { Environment } from "@react-three/drei";

import Camera from "../components/Camera";
import Printer from "../components/Printer";
import Locomotion from "../components/Locomotion";
import Ground from "../components/Group";

const store = createXRStore({
  controller: { teleportPointer: true },
  hand: { teleportPointer: true, touchPointer: false },
});

const PrinterPage = () => (
  <main>
    <IfSessionModeSupported mode="immersive-vr">
      <div className="vr">
        <button onClick={() => store.enterVR()}>Enter VR</button>
      </div>
    </IfSessionModeSupported>
    <Canvas shadows>
      <XR store={store}>
        <Printer />
        <Locomotion x={0} y={0} z={4}>
          <Ground />
        </Locomotion>
        <PointerEvents />
        <Environment files="/vr-labor/berlin.hdr" background />
        <Camera x={0} y={1.6} z={4} />
      </XR>
    </Canvas>
  </main>
);

export default PrinterPage;
