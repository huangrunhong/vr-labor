import {
  TeleportTarget,
  XROrigin,
  useXRControllerLocomotion,
} from "@react-three/xr";
import { useRef, useState } from "react";
import { Group, Vector3 } from "three";

const Locomotion = ({ children }: React.PropsWithChildren) => {
  const ref = useRef<Group>(null);
  const [position, setPosition] = useState(new Vector3(-6, 1.6, 0));

  useXRControllerLocomotion(ref);

  return (
    <>
      <XROrigin ref={ref} position={position} />
      <TeleportTarget onTeleport={setPosition}>{children}</TeleportTarget>
    </>
  );
};

export default Locomotion;
