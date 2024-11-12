import { Canvas } from "@react-three/fiber";
import { Environment, Stats } from "@react-three/drei";
import { createXRStore, IfSessionModeSupported, XR } from "@react-three/xr";

const store = createXRStore({
  hand: false,
  controller: { teleportPointer: false, rayPointer: true },
});

const Scene = ({ children }: React.PropsWithChildren) => (
  <main>
    <IfSessionModeSupported mode="immersive-vr">
      <div className="vr">
        <button onClick={() => store.enterVR()}>Enter VR</button>
      </div>
    </IfSessionModeSupported>
    <Canvas>
      <XR store={store}>
        {children}
        <Environment files="/vr-labor/berlin.hdr" background />
        <Stats />
      </XR>
    </Canvas>
  </main>
);

export default Scene;
