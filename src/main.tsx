import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Canvas } from "@react-three/fiber";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Canvas
        // orthographic
        camera={{ position: [0, 0, -10], fov: 45, far: 10000 }}
        className="border"
        // frameloop="demand"
      >
        <App />
      </Canvas>
    </div>
  </React.StrictMode>
);
