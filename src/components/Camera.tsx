import { useEffect, useMemo, useRef, useState } from "react";
import {
  Euler,
  Intersection,
  Mesh,
  Object3D,
  PerspectiveCamera,
  Raycaster,
  Vector2,
  Vector3,
} from "three";
import { PerspectiveCamera as PerspectiveCameraComponent } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useLocation } from "react-router-dom";

import collisionDetection from "../helpers/collisionDetection";

const isGroundObject = (intersection?: Intersection<Object3D>) =>
  intersection?.object.name.toLowerCase().startsWith("ground");

const findFloor = (raycaster: Raycaster, objects: Object3D[]) => {
  const [intersection] = raycaster.intersectObjects(objects);

  return isGroundObject(intersection) ? intersection : undefined;
};

interface cameraProps {
  x: number;
  y: number;
  z: number;
}

const Camera = ({ x, y, z }: cameraProps) => {
  const state = useThree();
  const location = useLocation();

  const circle = useRef<Mesh>(null);
  const camera = useRef<PerspectiveCamera>(null);

  const count = useRef(0);
  const euler = useMemo(() => new Euler(0, 0, 0, "YXZ"), []);
  const position = useMemo(() => new Vector3(x, y, z), []);
  const raycaster = useMemo(() => new Raycaster(), []);

  const [teleport, setTeleport] = useState(false);

  useEffect(() => {
    if (!camera.current) return;

    const origin: [number, number, number] =
      location.pathname === "/" ? [-6, 1.6, -1] : [0, 1.6, 0];

    euler.set(0, 0, 0);
    position.set(...origin);
    camera.current.quaternion.setFromEuler(euler);
  }, [location.pathname]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!camera.current) {
        return;
      }

      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(new Vector2(x, y), camera.current);

      const floor = findFloor(raycaster, state.scene.children);
      const moveable = !!floor && !collisionDetection(floor.point, state.scene);

      setTeleport(moveable);

      if (moveable && circle.current) {
        circle.current.position.set(floor.point.x, 0.01, floor.point.z);
      }

      if (!euler || !event.buttons) return;

      count.current += 1;

      euler.setFromQuaternion(camera.current.quaternion);

      euler.y += event.movementX * 0.002;
      euler.x += event.movementY * 0.002;

      camera.current.quaternion.setFromEuler(euler);
    };

    const onPointerUp = () => {
      if (!circle.current || !camera.current || count.current) {
        return void (count.current = 0);
      }

      const x = circle.current.position.x;
      const y = camera.current.position.y;
      const z = circle.current.position.z;

      position.set(x, y, z);
    };

    if (camera.current) {
      camera.current.lookAt(new Vector3(0, 1.6, -1));
    }

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  useFrame((_, delta) => {
    camera.current?.position.lerp(position, delta * 3);
  });

  return (
    <>
      <PerspectiveCameraComponent
        makeDefault
        ref={camera}
        position={position}
      />
      {teleport && (
        <mesh ref={circle} rotation-x={-Math.PI / 2}>
          <ringGeometry args={[0.16, 0.2]} />
          <meshBasicMaterial color={0x0065bd} transparent opacity={0.5} />
        </mesh>
      )}
    </>
  );
};

export default Camera;
