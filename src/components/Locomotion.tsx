import {
  TeleportTarget,
  XROrigin,
  useXRControllerLocomotion,
} from "@react-three/xr";
import React, { useRef, useState } from "react";
import { Group, Vector3 } from "three";

interface LocomotionProps {
  children: React.ReactNode;
  x: number;
  y: number;
  z: number;
}

const Locomotion = ({ children, x, y, z }: LocomotionProps) => {
  const ref = useRef<Group>(null);
  const [position, setPosition] = useState(new Vector3(x, y, z));

  useXRControllerLocomotion(ref);

  return (
    <>
      <XROrigin ref={ref} position={position} />
      <TeleportTarget onTeleport={setPosition}>{children}</TeleportTarget>
    </>
  );
};

export default Locomotion;
