import { BackSide } from "three";

function SkyDome() {
  return (
    <mesh>
      <sphereGeometry args={[500, 500, 500]} />
      <meshBasicMaterial color="black" side={BackSide} />
    </mesh>
  );
}

export default SkyDome;
