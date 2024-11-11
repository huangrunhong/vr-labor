import { useNavigate } from "react-router-dom";
import { Html } from "@react-three/drei";

const Annotation = () => {
  const navigate = useNavigate();

  return (
    <group position={[2.85, 1.35, -0.65]} rotation-y={Math.PI}>
      <Html transform scale={0.15} occlude>
        <div className="annotation" onClick={() => navigate("/printer")}>
          Explore more
        </div>
      </Html>
    </group>
  );
};

export default Annotation;
