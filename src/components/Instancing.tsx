import { useEffect, useMemo, useRef } from "react";
import { Color, DoubleSide, InstancedMesh, Object3D, PlaneGeometry } from "three";
import { getRandomInt } from "../utils";

function Instances({ count = 100, temp = new Object3D() }) {
  const instance = useRef<InstancedMesh>(null);
  const minDistance = 1000;

  const p: {
    posX: number;
    posY: number;
    posZ: number;
    rotX: number;
    rotY: number;
    rotZ: number;
  }[] = [];
  const particles = useMemo(() => {
    for (let i = 0; i < count; i++) {
      p.push({
        posX: Math.random() * minDistance * 2 - minDistance,
        posY: Math.random() * minDistance * 2 - minDistance,
        posZ: Math.random() * minDistance * 2 - minDistance,
        rotX: Math.random() * 2 * Math.PI,
        rotY: Math.random() * 2 * Math.PI,
        rotZ: Math.random() * 2 * Math.PI,
      });
    }
    return p;
  }, [count]);

  useEffect(() => {
    if (!instance.current) return;
    particles.forEach((p, i) => {
      if (!instance.current) return;
      temp.position.set(p.posX, p.posY, p.posZ);
      temp.rotation.x = p.rotX;
      temp.rotation.y = p.rotY;
      temp.rotation.z = p.rotZ;
      temp.updateMatrix();
      instance.current.setMatrixAt(i, temp.matrix);
      const gray = getRandomInt(0, 255) / 255;
      instance.current.setColorAt(
        i,
        new Color(gray, gray, gray).convertSRGBToLinear()
      );
    });
    instance.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={instance} args={[null, null, count]}>
      <planeGeometry />
      <meshBasicMaterial side={DoubleSide} />
    </instancedMesh>
  );
}

export default Instances;
