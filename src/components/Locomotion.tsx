import { useRef } from "react";
import { Group, Vector3 } from "three";
import { XROrigin, useXRControllerLocomotion } from "@react-three/xr";

import collisionDetection from "../helpers/collisionDetection";

interface LocomotionProps {
  x: number;
  y: number;
  z: number;
}

const Locomotion = ({ x, y, z }: LocomotionProps) => {
  const ref = useRef<Group>(null);

  useXRControllerLocomotion((translation, rotation, delta, state) => {
    if (!ref.current) return;

    const x = ref.current.position.x + translation.x * delta;
    const z = ref.current.position.z + translation.z * delta;

    ref.current.rotation.y += rotation;

    if (collisionDetection(new Vector3(x, 0, z), state.scene)) return;

    ref.current.position.x = x;
    ref.current.position.z = z;
  });

  return <XROrigin ref={ref} position={new Vector3(x, y, z)} />;
};

export default Locomotion;
