import { useThree } from "@react-three/fiber";
import { Color } from "three";

function SkyBox() {
  const { scene } = useThree();
  scene.background = new Color("black");
  return null;
}

export default SkyBox;
