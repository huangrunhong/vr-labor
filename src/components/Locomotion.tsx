import { useRef } from "react";
import { Group, Vector3 } from "three";
import { XROrigin, useXRControllerLocomotion } from "@react-three/xr";

interface LocomotionProps {
  x: number;
  y: number;
  z: number;
}

const Locomotion = ({ x, y, z }: LocomotionProps) => {
  const ref = useRef<Group>(null);

  useXRControllerLocomotion(ref);

  return <XROrigin ref={ref} position={new Vector3(x, y, z)} />;
};

export default Locomotion;
