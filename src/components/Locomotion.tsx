import { Vector3 } from "three";
import { XROrigin, useXR, useXRControllerLocomotion } from "@react-three/xr";

import collisionDetection from "../helpers/collisionDetection";

interface LocomotionProps {
  x: number;
  y: number;
  z: number;
}

const Locomotion = ({ x, y, z }: LocomotionProps) => {
  const xr = useXR();

  useXRControllerLocomotion((translation, rotation, delta, state) => {
    if (!xr.origin) return;

    const x = xr.origin.position.x + translation.x * delta * 5;
    const z = xr.origin.position.z + translation.z * delta * 5;

    xr.origin.rotation.y += rotation;

    if (collisionDetection(new Vector3(x, 0, z), state.scene)) return;

    xr.origin.position.x = x;
    xr.origin.position.z = z;
  });

  return <XROrigin position={new Vector3(x, y, z)} />;
};

export default Locomotion;
