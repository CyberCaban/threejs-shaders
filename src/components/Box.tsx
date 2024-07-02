import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

function Box({ ...props }) {
  const [hovered, hover] = useState(false);
  const boxRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (boxRef.current !== null) boxRef.current.rotation.x += delta;
  });

  return (
    <mesh
      {...props}
      ref={boxRef}
      onPointerEnter={(e) => (e.stopPropagation(), hover(true))}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[2, 3, 4]} />
      <meshStandardMaterial color={hovered ? "orange" : "blue"} />
    </mesh>
  );
}

export default Box;
