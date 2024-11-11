import { useAnimations, useGLTF } from "@react-three/drei";
import { LoopOnce } from "three";

import RingButton from "./RingButton";

let windowAnimationTimeScale = 1;
let printerAnimationTimeScale = 1;

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
      <spotLight
        position={[50, 50, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <RingButton x={1.658} y={1.245} z={0.2} onClick={openDoor} />
      <RingButton x={1.538} y={1.245} z={0.2} onClick={startPrinter} />
      <mesh position={[0, 0.1, 0]} castShadow>
        <primitive object={scene} />
      </mesh>
      <mesh
        name="ground"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="grey"
          roughness={0.35}
          metalness={1}
          envMapIntensity={1.5}
        />
      </mesh>
    </>
  );
};

export default Printer;
