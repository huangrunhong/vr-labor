import { useState } from "react";
import { TeleportTarget, XROrigin } from "@react-three/xr";
import { Vector3 } from "three";

interface LocomotionProps {
  children: React.ReactNode;
  x: number;
  y: number;
  z: number;
}

const Locomotion = ({ children, x, y, z }: LocomotionProps) => {
  const [position, setPosition] = useState(new Vector3(x, y, z));

  return (
    <>
      <XROrigin position={position} />
      <TeleportTarget onTeleport={setPosition}>{children}</TeleportTarget>
    </>
  );
};

export default Locomotion;
