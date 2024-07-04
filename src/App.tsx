import { Canvas, ThreeEvent } from "@react-three/fiber";
import Box from "./components/Box";
import { CameraControls } from "@react-three/drei";
import Instances from "./components/Instancing";
import SkyBox from "./components/SkyDome";
import { Suspense, useRef, useState } from "react";
import Sun from "./components/Sun";
import Mercury from "./components/Mercury";
import AstralBody from "./components/AstralBody";
import { Vector3 } from "three";
import { Perf } from "r3f-perf";
import { useCameraTarget } from "./utils";

function App() {
  const camera = useRef<CameraControls>(null);

const target = useCameraTarget()
  return (
    <>
      <Perf />
      <CameraControls ref={camera} makeDefault />
      <ambientLight />
      <SkyBox />
      <Instances count={100000} />

      <Suspense fallback={null}>
        <group
          // onClick={(e) => {
          //   e.eventObject.children.forEach((child) => {
          //     console.log(child.name, child.children[0].position);
          //   });

          //   target(e);
          // }}
        >
          <Sun position={[0, 500, 0]} />
          <Mercury position={[0, 500, 0]} />
        </group>
      </Suspense>
      <Box position={[0, 0, 1]} />
    </>
  );
}

export default App;
