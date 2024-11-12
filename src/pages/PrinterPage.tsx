import { useAnimations, useGLTF } from "@react-three/drei";
import { LoopOnce, Vector3 } from "three";

import Ground from "../components/Ground";
import RingButton from "../components/RingButton";
import Camera from "../components/Camera";
import Locomotion from "../components/Locomotion";

let windowAnimationTimeScale = 1;
let printerAnimationTimeScale = 1;

const doorButtonPosition = new Vector3(0.4, 1.36, 0.25);
const startButtonPosition = new Vector3(1.538, 1.245, 0.2);

const Printer = () => {
  const { animations, scene } = useGLTF("/vr-labor/printer.glb");
  const { actions } = useAnimations(animations, scene);

  const openDoor = () => {
    const door = actions["Door"];

    if (!door) return;

    door.reset();
    door.setLoop(LoopOnce, 1);
    door.timeScale = windowAnimationTimeScale;

    door.play();

    windowAnimationTimeScale = -windowAnimationTimeScale;
  };

  const startPrinter = () => {
    const printer = actions["Start"];

    if (!printer) return;

    printer.reset();
    printer.warp(0, 2, 1);
    printer.setLoop(LoopOnce, 1);
    printer.timeScale = printerAnimationTimeScale;

    printer.play();

    printerAnimationTimeScale = -printerAnimationTimeScale;
  };

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <primitive object={scene} />
      </mesh>
      <Ground />
      <Camera x={0} y={1.6} z={4} />
      <Locomotion x={0} y={0} z={4} />
      <RingButton onClick={openDoor} position={doorButtonPosition} />
      <RingButton onClick={startPrinter} position={startButtonPosition} />
    </>
  );
};

export default Printer;
