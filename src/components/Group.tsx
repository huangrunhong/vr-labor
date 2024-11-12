const Ground = () => (
  <mesh name="ground" rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
    <planeGeometry args={[100, 100]} />
    <meshStandardMaterial
      color="grey"
      roughness={0.35}
      metalness={1}
      envMapIntensity={1.5}
    />
  </mesh>
);

export default Ground;
