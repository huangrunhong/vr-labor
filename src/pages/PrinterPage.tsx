import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { Environment } from "@react-three/drei";

import Camera from "../components/Camera";

import Printer from "../components/Printer";

const store = createXRStore({
  hand: { teleportPointer: true },
  controller: { teleportPointer: true },
});

const PrinterPage = () => {
  return (
    <Canvas shadows>
      <XR store={store}>
        <Printer />
        <Environment files="/vr-labor/berlin.hdr" background />
        <Camera x={0} y={1.6} z={6} />
      </XR>
    </Canvas>
  );
};

export default PrinterPage;
