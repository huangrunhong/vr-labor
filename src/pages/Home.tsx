import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, Stats } from "@react-three/drei";
import { IfSessionModeSupported, XR, createXRStore } from "@react-three/xr";
import { useNavigate } from "react-router-dom";

import Camera from "../components/Camera";
import Locomotion from "../components/Locomotion";
import Room from "../components/Room";
import RingButton from "../components/RingButton";

import "../styles/app.scss";
import VRButton from "../components/VrButton";

const store = createXRStore({
  hand: { teleportPointer: true },
  controller: { teleportPointer: true },
});

const Home = () => {
  const navigate = useNavigate();

  return (
    <main>
      <IfSessionModeSupported mode="immersive-vr">
        <div className="vr">
          <button onClick={() => store.enterVR()}>Enter VR</button>
        </div>
      </IfSessionModeSupported>
      <Canvas>
        <XR store={store}>
          <Locomotion x={-6} y={0} z={0}>
            <VRButton />
            <Room />
            <RingButton
              position={new Vector3(3.2, 1.35, -2)}
              onClick={() => navigate("/printer")}
              rotation-y={Math.PI}
            />
          </Locomotion>
          <Environment files="/vr-labor/berlin.hdr" background />
          <Camera x={-6} y={1.6} z={-1} />
          <Stats />
        </XR>
      </Canvas>
    </main>
  );
};

export default Home;
