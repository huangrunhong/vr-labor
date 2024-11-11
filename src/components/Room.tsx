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

  stand.distanceTo(target) < 3 ? action.play() : action.reset();
};

const Room = () => {
  const xr = useXR();
  const xrSession = useSessionFeatureEnabled("immersive-vr");
  const { animations, scene, nodes } = useGLTF("/vr-labor/room.glb");
  const { actions } = useAnimations(animations, scene);

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

  return <primitive object={scene} />;
};

export default Room;
