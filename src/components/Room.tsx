import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSessionFeatureEnabled, useXR } from "@react-three/xr";
import { AnimationAction, Object3D, Vector2 } from "three";

const play = (
  camera?: Object3D,
  object?: Object3D,
  action?: AnimationAction | null
) => {
  if (!camera || !object || !action) return;

  const stand = new Vector2(camera.position.x, camera.position.z);
  const target = new Vector2(object.position.x, object.position.z);

  stand.distanceTo(target) < 2 ? action.play() : action.reset();
};

const Room = () => {
  const xr = useXR();
  const xrSession = useSessionFeatureEnabled("immersive-vr");
  const { animations, scene, nodes } = useGLTF("/vr-labor/room.glb");
  const { actions } = useAnimations(animations, scene);

  useFrame((state) => {
    const object = nodes["Door_moving_lobby"];
    const action = actions["Door_entrance"];

    xrSession
      ? play(xr.origin, object, action)
      : play(state.camera, object, action);
  });

  return <primitive object={scene} />;
};

export default Room;
