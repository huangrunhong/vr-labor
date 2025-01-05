import { Vector3 } from "three";
// import { useThree } from "@react-three/fiber";
import { XROrigin, useXR, useXRControllerLocomotion } from "@react-three/xr";

// import collisionDetection from "../helpers/collisionDetection";

interface LocomotionProps {
  x: number;
  y: number;
  z: number;
}

const Locomotion = ({ x, y, z }: LocomotionProps) => {
  const xr = useXR();
  // const state = useThree();

  useXRControllerLocomotion((translation, rotation, delta) => {
    if (!xr.origin) return;

    const x = xr.origin.position.x + translation.x * delta * 3;
    const z = xr.origin.position.z + translation.z * delta * 3;

    xr.origin.rotation.y += rotation;

    // const position = new Vector3(x, 0, z).applyMatrix4(xr.origin.matrixWorld);

    // if (collisionDetection(position, state.scene)) return;

    xr.origin.position.x = x;
    xr.origin.position.z = z;
  });

  return <XROrigin position={new Vector3(x, y, z)} />;
};

export default Locomotion;
