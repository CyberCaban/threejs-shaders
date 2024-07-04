import { useGLTF } from "@react-three/drei";
import { Mesh, Vector3 } from "three";
import { useCameraLookAt } from "../utils";
import { forwardRef } from "react";
import { ThreeEvent } from "@react-three/fiber";

const AstralBody = forwardRef(function AstralBody(
  props: {
    children?: React.ReactNode;
    modelPath: string;
    scale: number;
    position: Vector3;
    cameraPos?: number[];
    props?: unknown;
    onClick?: (e: ThreeEvent<MouseEvent>) => void;
  },
  ref: Mesh | null
) {
  const { children, modelPath, scale, position, cameraPos, onClick, ...otherProps } =
    props;
  const { nodes, materials } = useGLTF(modelPath);
  const nodesName = Object.entries(nodes)[1][1].name;
  const materialsName = Object.entries(materials)[0][1].name;

  const lookAt = useCameraLookAt(ref);
  const name = modelPath.split(".")[modelPath.split(".").length - 2].slice(1);

  if (cameraPos?.length !== 3) return null;
  return (
    <group
      {...otherProps}
      position={position}
      scale={scale}
      dispose={null}
      // onClick={(e) => lookAt(e, ...cameraPos)}
      name={name}
    >
      <mesh
        ref={ref}
        geometry={nodes[nodesName].geometry}
        material={materials[materialsName]}
        scale={scale}
        onClick={(e)=>{
          e.stopPropagation();
          onClick?.(e);
          lookAt(e, ...cameraPos);
        }}
      ></mesh>

      {children}
    </group>
  );
});

export default AstralBody;
