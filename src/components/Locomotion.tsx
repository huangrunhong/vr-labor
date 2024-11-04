import { useFrame } from "@react-three/fiber";
import {
  useXRInputSourceState,
  TeleportTarget,
  XROrigin,
  XRControllerState,
} from "@react-three/xr";
import { useRef, useState } from "react";
import { Group, Vector3 } from "three";

const getThumbStick = (controller?: XRControllerState) =>
  controller?.gamepad["xr-standard-thumbstick"];

const Locomotion = ({ children }: React.PropsWithChildren) => {
  const ref = useRef<Group>(null);
  const [position, setPosition] = useState(new Vector3(-6, 1.6, 0));

  const leftController = useXRInputSourceState("controller", "left");
  const rightController = useXRInputSourceState("controller", "right");

  useFrame((_, delta) => {
    const leftThumbStick = getThumbStick(leftController);
    const rightThumbStick = getThumbStick(rightController);

    if (!ref.current || !leftThumbStick) return;

    ref.current.position.x += (leftThumbStick.xAxis ?? 0) * delta;
    ref.current.position.z += (leftThumbStick.yAxis ?? 0) * delta;

    if (!ref.current || !rightThumbStick) return;

    const x = Math.sign(rightThumbStick.xAxis ?? 0);

    ref.current.rotateY(((x * Math.PI) / 8) * delta);
  });

  return (
    <>
      <XROrigin ref={ref} position={position} />
      <TeleportTarget onTeleport={setPosition}>{children}</TeleportTarget>
    </>
  );
};

export default Locomotion;
