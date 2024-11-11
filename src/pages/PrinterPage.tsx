import { Canvas } from "@react-three/fiber";
import { createXRStore, IfSessionModeSupported, XR } from "@react-three/xr";
import { Environment } from "@react-three/drei";

import Camera from "../components/Camera";
import Printer from "../components/Printer";

const store = createXRStore({
  hand: { teleportPointer: true },
  controller: { teleportPointer: true },
});

const PrinterPage = () => {
  return (
    <main>
      <IfSessionModeSupported mode="immersive-vr">
        <div className="vr">
          <button onClick={() => store.enterVR()}>Enter VR</button>
        </div>
      </IfSessionModeSupported>
      <Canvas shadows>
        <XR store={store}>
          <Printer />
          <Environment files="/vr-labor/berlin.hdr" background />
          <Camera x={0} y={1.6} z={6} />
        </XR>
      </Canvas>
    </main>
  );
};

export default PrinterPage;
