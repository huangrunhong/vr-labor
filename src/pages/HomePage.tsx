import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSessionFeatureEnabled, useXR } from "@react-three/xr";

import { AnimationAction, LoopOnce, Object3D, Vector2, Vector3 } from "three";

import CircleButton from "../components/CircleButton";

let windowAnimationTimeScale = 1;
let printerAnimationTimeScale = 1;

const doorButtonPosition = new Vector3(-3.125, 1.35, 0.8);
const startButtonPosition = new Vector3(-2.1, 1.25, 0.8);

const play = (
  camera?: Object3D,
  object?: Object3D,
  action?: AnimationAction | null
) => {
  if (!camera || !object || !action) return;

  const stand = new Vector2(camera.position.x, camera.position.z);
  const target = new Vector2(object.position.x, object.position.z);

  stand.distanceTo(target) < 3 ? action.play() : action.reset();
};

const HomePage = () => {
  const xr = useXR();
  const xrSession = useSessionFeatureEnabled("immersive-vr");
  const { animations, scene, nodes } = useGLTF(
    "/vr-labor/room-with-printer.glb"
  );
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

  const playAction = (obj: string, act: string) => {
    useFrame((state) => {
      const object = nodes[obj];
      const action = actions[act];

      xrSession
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
