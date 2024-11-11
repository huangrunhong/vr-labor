import { useAnimations, useGLTF } from "@react-three/drei";
import { LoopOnce, Vector3 } from "three";

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
      <RingButton onClick={openDoor} position={new Vector3(0.45, 1.36, 0.25)} />
      <RingButton
        onClick={startPrinter}
        position={new Vector3(1.538, 1.245, 0.2)}
      />
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
