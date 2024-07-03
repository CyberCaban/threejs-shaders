import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import { useCameraLookAt } from "../utils";

function Box({ ...props }) {
  const [hovered, hover] = useState(false);
  const boxRef = useRef<Mesh>(null);
  const lookAt = useCameraLookAt();

  useFrame((_, delta) => {
    if (boxRef.current !== null) boxRef.current.rotation.x += delta;
  });

  return (
    <mesh
      {...props}
      ref={boxRef}
      onPointerEnter={(e) => (e.stopPropagation(), hover(true))}
      onPointerOut={() => hover(false)}
      onClick={(e) => lookAt(e, 50, 50, 50)}
    >
      <boxGeometry args={[2, 3, 4]} />
      <meshStandardMaterial color={hovered ? "orange" : "blue"} />
    </mesh>
  );
}

export default Box;
