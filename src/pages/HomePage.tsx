import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useXR } from "@react-three/xr";

import { AnimationAction, LoopOnce, Object3D, Vector3 } from "three";

import CircleButton from "../components/CircleButton";
import collisionDetection from "../helpers/collisionDetection";

const doorButtonPosition = new Vector3(-3.125, 1.35, 0.8);
const startButtonPosition = new Vector3(-2.1, 1.25, 0.8);

const cameraBox = new Vector3(1.5, 0.5, 1.5);

const modelPath = "/vr-labor/room-with-printer.glb";

const play = (
  camera?: Object3D,
  object?: Object3D,
  action?: AnimationAction | null
) => {
  if (!camera || !object || !action) return;

  if (collisionDetection(camera.position, object, cameraBox)) {
    return void action.play();
  }

  action.reset();
};

const HomePage = () => {
  const xr = useXR();
  const { animations, scene, nodes } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);

  const openDoor = () => {
    const door = actions["Door"];

    if (!door) return;

    door.play();
    door.setLoop(LoopOnce, 1);
    door.reset();
  };

  const startPrinter = () => {
    const printer = actions["Start"];

    if (!printer) return;

    printer.warp(0, 2, 1);
    printer.setLoop(LoopOnce, 1);
    printer.play();
    printer.reset();
  };

  const playAction = (obj: string, act: string) => {
    useFrame((state) => {
      const object = nodes[obj];
      const action = actions[act];

      xr.mode
        ? play(xr.origin, object, action)
        : play(state.camera, object, action);
    });
  };

  playAction("Door_moving_lobby", "Door_entrance");
  playAction("Door_moving_social_space", "Door_social_space");

  return (
    <>
      <primitive object={scene} />
      <mesh rotation-y={Math.PI}>
        <CircleButton onClick={openDoor} position={doorButtonPosition} />
        <CircleButton onClick={startPrinter} position={startButtonPosition} />
      </mesh>
    </>
  );
};

export default HomePage;
