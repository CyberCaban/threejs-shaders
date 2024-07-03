import { useGLTF } from "@react-three/drei";
import { useCameraLookAt } from "../utils";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh, ShaderMaterial } from "three";

const SunShader = {
  uniforms: {
    u_time: { value: 0.0 },
  },
  vertexShader: `
        uniform float u_time;
        varying float vZ;
        void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            
            modelPosition.y += sin(modelPosition.x * 5.0 + u_time * 3.0) * 0.1;
            modelPosition.y += sin(modelPosition.z * 6.0 + u_time * 2.0) * 0.1;
            
            vZ = modelPosition.y;

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;
        }
    `,
  fragmentShader: `
        uniform float u_time;
        varying vec2 vUv;
        void main() {
            vec3 color = vec3(1.0, 1.0, 1.0);
            float alpha = 1.;
            gl_FragColor = vec4(color*(sin(u_time/10.)+1.), alpha);
        }
    `,
};

export default function Sun(props) {
  const { nodes, materials } = useGLTF("/Sun.glb");
  const lookAt = useCameraLookAt();
  const ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta / 10;

    // ref.current.material.uniforms.u_time.value =
    //   state.clock.getElapsedTime();
  });

  return (
    <group {...props} dispose={null} onClick={(e) => lookAt(e, 150, 150, 150)}>
      <mesh
        geometry={nodes.Cube001.geometry}
        material={materials["None"]}
        scale={100}
        ref={ref}
      >
        
        {/* <shaderMaterial
          uniforms={SunShader.uniforms}
          vertexShader={SunShader.vertexShader}
          // fragmentShader={SunShader.fragmentShader}
          wireframe={true}
        /> */}
      </mesh>
    </group>
  );
}

useGLTF.preload("/Sun.glb");
