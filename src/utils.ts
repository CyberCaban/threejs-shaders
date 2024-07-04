import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";
import { Vector3 } from "three";

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function useCameraLookAt(meshRef?) {
  const controls = useThree((state) => state.controls);
  console.log(controls);

  const [following, setFollowing] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef || !meshRef.current || !following) return;
    controls.setTarget(
      meshRef.current.position.x/10,
      meshRef.current.position.y+500,
      meshRef.current.position.z/10
    )
  });

  return function (
    target: ThreeEvent<MouseEvent>,
    offX: number = 500,
    offY: number = 400,
    offZ: number = 300
  ) {
    setFollowing((prev) => !prev);
  };
}

export function useCameraTarget() {
  const [target, setTarget] = useState("");

  return function (target: ThreeEvent<MouseEvent>) {
    console.log(target.eventObject);
    setTarget(target.eventObject.name);
  };
}
