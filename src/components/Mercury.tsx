/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { Mesh, Vector3 } from "three";
import AstralBody from "./AstralBody";
import { useFrame } from "@react-three/fiber";
import { forwardRef, useRef } from "react";
import { PointerLockControls } from "@react-three/drei";

export default function Mercury(props) {
  const mercuryRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!mercuryRef.current) return;
    const rotationSpeed = 0.1,
      orbitSpeed = 0.2,
      orbitRadius = 700;
    mercuryRef.current.rotation.y += delta * rotationSpeed;

    mercuryRef.current.position.x =
      Math.sin(state.clock.getElapsedTime() * orbitSpeed) * orbitRadius;
    mercuryRef.current.position.z =
      Math.cos(state.clock.getElapsedTime() * orbitSpeed) * orbitRadius;
  });

  return (
    <AstralBody
      // name="Mercury"
      ref={mercuryRef}
      modelPath="./Mercury.glb"
      position={new Vector3(0, 0, 0)}
      scale={0.1}
      cameraPos={[100, 100, 100]}
      {...props}
    ></AstralBody>
  );
}
