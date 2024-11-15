import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useXR } from "@react-three/xr";
import { useNavigate } from "react-router-dom";
import { AnimationAction, Object3D, Vector3 } from "three";

import CircleButton from "../components/CircleButton";
import collisionDetection from "../helpers/collisionDetection";
import playOnce from "../helpers/playOnce";

const buttonPosition = new Vector3(-3.125, 1.35, 0.8);

const cameraBox = new Vector3(1.5, 0.5, 1.5);

const modelPath = "/vr-labor/room.glb";

const play = (
  camera?: Object3D,
  object?: Object3D,
  action?: AnimationAction | null
) => {
  if (!camera || !object || !action) return;

  const running = action.isRunning();
  const collided = collisionDetection(camera.position, object, cameraBox);

  !running && collided && playOnce(action);
};

const HomePage = () => {
  const xr = useXR();
  const navigate = useNavigate();
  const { animations, scene, nodes } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);

  useFrame((state) => {
    const playAction = (
      object: Object3D | undefined,
      action: AnimationAction | null
    ) =>
      xr.mode
        ? play(xr.origin, object, action)
        : play(state.camera, object, action);

    playAction(nodes["Door_moving_lobby"], actions["Door_entrance"]);
    playAction(nodes["Door_moving_social_space"], actions["Door_social_space"]);
  });

  const toPrinterPage = () => {
    xr.session?.end();
    navigate("/printer");
  };

  return (
    <>
      <primitive object={scene} />
      <mesh rotation-y={Math.PI}>
        <CircleButton onClick={toPrinterPage} position={buttonPosition} />
      </mesh>
    </>
  );
};

export default HomePage;
