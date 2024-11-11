import { Canvas } from "@react-three/fiber";
import { Environment, Stats } from "@react-three/drei";
import { IfSessionModeSupported, XR, createXRStore } from "@react-three/xr";

import Annotation from "../components/Annotation";
import Camera from "../components/Camera";
import Locomotion from "../components/Locomotion";
import Room from "../components/Room";

import "../styles/app.scss";

const store = createXRStore({
  hand: { teleportPointer: true },
  controller: { teleportPointer: true },
});

const Home = () => (
  <main>
    <IfSessionModeSupported mode="immersive-vr">
      <div className="vr">
        <button onClick={() => store.enterVR()}>Enter VR</button>
      </div>
    </IfSessionModeSupported>
    <Canvas>
      <XR store={store}>
        <Locomotion>
          <Room />
          <Annotation />
        </Locomotion>
        <Environment files="/vr-labor/berlin.hdr" background />
        <Camera x={-6} y={1.6} z={-1} />
        <Stats />
      </XR>
    </Canvas>
  </main>
);

export default Home;
