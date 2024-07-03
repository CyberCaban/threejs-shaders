import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";
import { useCameraLookAt } from "../utils";

export default function AstralBody({
  children,
  modelPath,
  scale,
  position,
  cameraPos,
  ...props
}: {
  children?: React.ReactNode;
  modelPath: string;
  scale: number;
  position: Vector3;
  cameraPos?: number[];
  props?: any;
}) {
  const { nodes, materials } = useGLTF(modelPath);
  const nodesName = Object.entries(nodes)[1][1].name;
  const materialsName = Object.entries(materials)[0][1].name;

  const lookAt = useCameraLookAt();

  if (cameraPos?.length !== 3) return null;
  return (
    <group
      {...props}
      position={position}
      scale={scale}
      dispose={null}
      onClick={(e) => lookAt(e, ...cameraPos)}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes[nodesName].geometry}
        material={materials[materialsName]}
        scale={scale}
      ></mesh>
    </group>
  );
}
