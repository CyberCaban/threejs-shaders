import { useEffect, useRef } from "react";
import { Color, Euler, InstancedMesh, Object3D } from "three";
import { getRandomInt } from "../utils";
import { useFrame } from "@react-three/fiber";

function Instances({ count = 100, temp = new Object3D() }) {
  const instance = useRef<InstancedMesh>(null);

  useFrame((_, delta) => {
    // if (instance.current !== null) {
    //   instance.current.rotation.x += delta;
    // }
  });

  useEffect(() => {
    if (!instance.current) return;
    for (let i = 0; i < count; i++) {
      temp.position.set(
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500
      );
      temp.rotation.set(
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI
      )
      temp.updateMatrix();
      instance.current.setMatrixAt(i, temp.matrix);
      const gray = getRandomInt(0, 255) / 255;
      instance.current.setColorAt(
        i,
        new Color(gray, gray, gray).convertSRGBToLinear()
      );
    }
    instance.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={instance} args={[null, null, count]}>
      <boxGeometry />
      <meshBasicMaterial />
    </instancedMesh>
  );
}

export default Instances;
