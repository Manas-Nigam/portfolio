"use client";

import React, { useState, useRef, Suspense } from "react";
import {Canvas,useFrame} from "@react-three/fiber"
import {Points,PointMaterial,preload} from "@react-three/drei"
import * as random from "maath/random/dist/maath-random.esm";
function StarBackground({ props }) {
  const ref = useRef();

  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          dethWrite={true}
        ></PointMaterial>
      </Points>
    </group>
  );
}

const StarCanvas = () => {
  <div className="h-auto w-full fixed insert-0 z-[20]">
    <Canvas camera={{ positions: [0, 0, 1] }}>
      <Suspense fallback={true}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>;
};

export default StarCanvas;
