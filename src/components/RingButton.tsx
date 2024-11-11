import { animated, config, useSpring } from "@react-spring/three";
import { ThreeEvent } from "@react-three/fiber";

import { Vector3 } from "three";

interface RingButtonProps {
  x: number;
  y: number;
  z: number;
  onClick?: (event: ThreeEvent<MouseEvent>) => void;
}

const RingButton = ({ x, y, z, onClick }: RingButtonProps) => {
  const spring = useSpring({
    config: config.gentle,
    loop: { reverse: true },
    from: { opacity: 0.1 },
    to: { opacity: 0.4 },
  });

  return (
    <group position={new Vector3(x, y, z)} onClick={onClick}>
      <mesh>
        <ringGeometry args={[0.025, 0.04]} />
        <animated.meshBasicMaterial
          color={0xffffff}
          transparent
          opacity={spring.opacity}
        />
      </mesh>
      <mesh>
        <circleGeometry args={[0.025]} />
        <meshBasicMaterial color={0xffffff} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

export default RingButton;
