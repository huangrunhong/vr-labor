import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Vector2 } from "three";
import * as THREE from "three";

const VRButton = () => {
  const [color, setColor] = useState("white");
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const navigate = useNavigate();

  useFrame(({ raycaster, camera }) => {
    if (meshRef.current) {
      raycaster.setFromCamera(new Vector2(0, 0), camera);
      const intersects = raycaster.intersectObject(meshRef.current);
      setHovered(intersects.length > 0);
    }
  });
  return (
    <>
      <Box
        ref={meshRef}
        args={[0.2, 0.1, 0.01]}
        position={[3, 1.5, -2]}
        onClick={() => navigate("/printer")}
        onPointerOver={() => {
          setHovered(true);
          setColor("lightorange");
        }}
        onPointerOut={() => {
          setHovered(false);
          setColor("white");
        }}
      >
        <meshStandardMaterial color={hovered ? "orange" : color} />
      </Box>
    </>
  );
};

export default VRButton;
