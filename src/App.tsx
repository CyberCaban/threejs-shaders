import { Canvas, ThreeEvent } from "@react-three/fiber";
import Box from "./components/Box";
import { CameraControls } from "@react-three/drei";
import Instances from "./components/Instancing";
import SkyBox from "./components/SkyDome";
import { Suspense, useRef } from "react";
import Sun from "./components/Sun";
import Mercury from "./components/Mercury";
import AstralBody from "./components/AstralBody";
import { Vector3 } from "three";

function App() {
  const camera = useRef<CameraControls>(null);
  return (
    <div className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Canvas
        // orthographic
        camera={{ position: [0, 0, -10], fov: 45, far: 10000 }}
        className="border"
        // frameloop="demand"
      >
        <CameraControls ref={camera} makeDefault />
        <ambientLight intensity={Math.PI / 2} />
        <SkyBox />
        <Instances count={100000} />

        <Suspense fallback={null}>
          <Sun position={[0, 500, 0]} />
          <Mercury position={[100, 500, 0]} />
        </Suspense>
        <Box position={[0, 0, 1]} />
      </Canvas>
    </div>
  );
}

export default App;
