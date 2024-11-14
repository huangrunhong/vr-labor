import { animated } from "@react-spring/three";
import { GroupProps } from "@react-three/fiber";
import { useState } from "react";

const Button1 = (props: GroupProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      {...props}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <ringGeometry args={[0.06, 0.07]} />
        <animated.meshBasicMaterial color={0xffffff} transparent opacity={1} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.06]} />
        <meshBasicMaterial
          color={hovered ? 0x3070b3 : 0xffffff}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};

export default Button1;
