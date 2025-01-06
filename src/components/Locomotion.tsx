import { Box2, Vector2, Vector3 } from "three";
// import { useThree } from "@react-three/fiber";
import { XROrigin, useXR, useXRControllerLocomotion } from "@react-three/xr";

// import collisionDetection from "../helpers/collisionDetection";

const entrance = new Box2(new Vector2(-7.25, -4.6), new Vector2(0, 2.95));
const mainHall = new Box2(new Vector2(-0.02, -9.6), new Vector2(25.45, 2.95));
const sideHall = new Box2(new Vector2(4.95, 2.9), new Vector2(9.3, 10.97));

const inRange = (x: number, z: number) => {
  const point = new Vector2(x, z);
  return (
    entrance.containsPoint(point) ||
    mainHall.containsPoint(point) ||
    sideHall.containsPoint(point)
  );
};

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

    if (!inRange(x, z)) return;

    // const position = new Vector3(x, 0, z).applyMatrix4(xr.origin.matrixWorld);

    // if (collisionDetection(position, state.scene)) return;

    xr.origin.position.x = x;
    xr.origin.position.z = z;
  });

  return <XROrigin position={new Vector3(x, y, z)} />;
};

export default Locomotion;
