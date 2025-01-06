import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useXR } from "@react-three/xr";
import { useNavigate } from "react-router-dom";
import { AnimationAction, Object3D, Vector3 } from "three";

import CircleButton from "../components/CircleButton";
import collisionDetection from "../helpers/collisionDetection";
import playOnce from "../helpers/playOnce";

const buttonPosition = new Vector3(-2.8, 1.35, 0.5);

const cameraBox = new Vector3(2, 0.25, 1.5);

const modelPath = "/vr-labor/room.glb";
const logoPath = "/vr-labor/logo.glb";
const printerSkinPath = "/vr-labor/printerSkin.glb";
const vppSkinPath = "/vr-labor/vppSkin.glb";

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
  const room = useGLTF(modelPath);
  const printerSkin = useGLTF(printerSkinPath);
  const vppSkin = useGLTF(vppSkinPath);
  const logo = useGLTF(logoPath);
  const roomActions = useAnimations(room.animations, room.scene);

  useFrame((state) => {
    const playAction = (
      object: Object3D | undefined,
      action: AnimationAction | null
    ) =>
      xr.mode
        ? play(xr.origin, object, action)
        : play(state.camera, object, action);

    playAction(
      room.nodes["Door_moving_lobby"],
      roomActions.actions["Door_entrance"]
    );
    playAction(
      room.nodes["Door_moving_social_space"],
      roomActions.actions["Door_social_space"]
    );
  });

  const toPrinterPage = () => {
    xr.session?.end();
    navigate("/printer");
  };

  const openDoor = () => playOnce(roomActions.actions["Door_entrance"], 2);
  const openSocialSpace = () =>
    playOnce(roomActions.actions["Door_social_space"], 2);

  return (
    <>
      <primitive object={room.scene} />
      <primitive object={logo.scene} />
      <primitive object={printerSkin.scene} />
      <primitive object={vppSkin.scene} />
      <mesh rotation-y={Math.PI}>
        <CircleButton onClick={toPrinterPage} position={buttonPosition} />
      </mesh>
      <mesh rotation-y={Math.PI}>
        <CircleButton onClick={openSocialSpace} position={[-6, 1.35, -3.2]} />
      </mesh>
      <mesh rotation-y={0}>
        <CircleButton onClick={openSocialSpace} position={[8.1, 1.35, 3.3]} />
      </mesh>
      <mesh rotation-y={Math.PI / 2}>
        <CircleButton onClick={openDoor} position={[4.2, 1.35, 0.3]} />
      </mesh>
      <mesh rotation-y={-Math.PI / 2}>
        <CircleButton onClick={openDoor} position={[-2.5, 1.35, 0.2]} />
      </mesh>
    </>
  );
};

export default HomePage;
