import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { AnimationAction, Camera, Object3D, Vector2 } from "three";

const play = (
  camera: Camera,
  object?: Object3D,
  action?: AnimationAction | null
) => {
  if (!object || !action) return;

  const stand = new Vector2(camera.position.x, camera.position.z);
  const target = new Vector2(object.position.x, object.position.z);

  stand.distanceTo(target) < 2 ? action.play() : action.reset();
};

const Room = () => {
  const { animations, scene, nodes } = useGLTF("/vr-labor/room.glb");
  const { actions } = useAnimations(animations, scene);
  console.log(actions);

  useFrame((state) => {
    play(state.camera, nodes["Door_moving_lobby"], actions["Door_entrance"]);
  });

  return <primitive object={scene} />;
};

export default Room;
