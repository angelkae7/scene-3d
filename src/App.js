import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./App.css";
import SceneContent from "./components/SceneContent"; // le nouveau composant


import { EffectComposer, DepthOfField, Bloom } from '@react-three/postprocessing'

export default function App() {
  return (
    <div className="App">
      <Canvas camera={{ position: [500, 60, 30], fov: 70, far: 5000 }} >
        
        <ambientLight />
        <directionalLight position={[0, 10, 5]} intensity={1} />
          <SceneContent /> {/* ✔ tous les hooks sont maintenant dans ce composant */}

          <OrbitControls
            minAzimuthAngle={-Math.PI / 1}
            maxAzimuthAngle={Math.PI / 1}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI - Math.PI / 2.5}
          />
          <EffectComposer>
            <Bloom intensity={1.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
            <DepthOfField
              focusDistance={0.1}
              focalLength={0.10}
              bokehScale={2}
            />
          </EffectComposer>
      </Canvas>
    </div>
  );
}
