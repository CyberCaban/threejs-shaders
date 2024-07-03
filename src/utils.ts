import { ThreeEvent, useThree } from "@react-three/fiber";

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function useCameraLookAt() {
  const controls = useThree((state) => state.controls);

  return function (
    target: ThreeEvent<MouseEvent>,
    offX: number = 500,
    offY: number = 400,
    offZ: number = 300
  ) {
    const { x, y, z } = target.eventObject.position;
    controls?.setLookAt(x + offX, y + offY, z + offZ, x, y, z, true);
  };
}
