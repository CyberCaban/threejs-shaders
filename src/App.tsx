import { Canvas } from "@react-three/fiber";
import Box from "./components/Box";
import { CameraControls } from "@react-three/drei";
import Instances from "./components/Instancing";
import SkyDome from "./components/SkyDome";

function App() {
  return (
    <div className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Canvas
        camera={{ position: [0, 0, -10], fov: 45, far: 1000 }}
        className="border"
        // frameloop="demand"
      >
        <CameraControls />
        <ambientLight intensity={Math.PI / 2} />

        <SkyDome />
        <Box position={[0, 0, 1]} />
        <Instances count={100000}/>
      </Canvas>
    </div>
  );
}

export default App;
