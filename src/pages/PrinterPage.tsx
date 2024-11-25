import { useAnimations, useGLTF, useVideoTexture } from "@react-three/drei";
import { Vector3 } from "three";

import Ground from "../components/Ground";
import CircleButton from "../components/CircleButton";
import playOnce from "../helpers/playOnce";

const doorButtonPosition = new Vector3(0.4, 1.36, 0.25);
const startButtonPosition = new Vector3(1.538, 1.245, 0.2);

const VideoMaterial = (props: { url: string }) => {
  const texture = useVideoTexture(props.url);
  return (
    <mesh position={[-0.03, 1.3075, 0.291]}>
      <planeGeometry args={[0.51, 0.33]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};
const Printer = () => {
  const { animations, scene } = useGLTF("/vr-labor/printer.glb");
  const { actions } = useAnimations(animations, scene);

  const openDoor = () => playOnce(actions["Door"]);
  const startPrinter = () => playOnce(actions["Start"], 2);

  return (
    <group position={[0, 0, -4]}>
      <group position={[0, 0.1, 0]}>
        <primitive object={scene} />
      </group>
      <VideoMaterial url={"/vr-labor/video.mp4"} />
      <Ground />
      <fog attach="fog" args={["#f0f0f0", 0, 20]} />
      <CircleButton onClick={openDoor} position={doorButtonPosition} />
      <CircleButton onClick={startPrinter} position={startButtonPosition} />
    </group>
  );
};

export default Printer;
