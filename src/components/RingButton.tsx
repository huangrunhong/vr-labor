import { animated, config, useSpring } from "@react-spring/three";
import { GroupProps } from "@react-three/fiber";

const RingButton = (props: GroupProps) => {
  const spring = useSpring({
    config: config.gentle,
    loop: { reverse: true },
    from: { opacity: 0.1 },
    to: { opacity: 0.4 },
  });

  return (
    <group {...props}>
      <mesh>
        <ringGeometry args={[0.035, 0.06]} />
        <animated.meshBasicMaterial
          color={0xffffff}
          transparent
          opacity={spring.opacity}
        />
      </mesh>
      <mesh>
        <circleGeometry args={[0.035]} />
        <meshBasicMaterial color={0xffffff} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

export default RingButton;
