import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// 植物叶子实例化渲染组件
function LeavesInstanced({ position, seed = 1 }: { position: [number, number, number]; seed?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const matrix = new THREE.Matrix4();
  const color = new THREE.Color();
  
  useEffect(() => {
    if (meshRef.current) {
      const mesh = meshRef.current;
      const count = 8;
      
      for (let i = 0; i < count; i++) {
        const getRandom = (min: number, max: number, offset: number) => {
          const x = Math.sin(seed * 100 + offset) * 10000;
          return min + (x - Math.floor(x)) * (max - min);
        };
        
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.3 + getRandom(0, 0.2, i * 10);
        const height = 1 + getRandom(0, 0.5, i * 20);
        
        // 设置位置
        matrix.makeTranslation(
          Math.cos(angle) * radius,
          0.9 + height,
          Math.sin(angle) * radius
        );
        
        // 设置旋转
        matrix.multiply(new THREE.Matrix4().makeRotationX(getRandom(0, 0.4, i * 30)));
        matrix.multiply(new THREE.Matrix4().makeRotationY(angle));
        matrix.multiply(new THREE.Matrix4().makeRotationZ(getRandom(0, 0.2, i * 40)));
        
        mesh.setMatrixAt(i, matrix);
        color.set(i % 2 === 0 ? '#1a7a1a' : '#2a9a2a');
        mesh.setColorAt(i, color);
      }
      
      mesh.instanceMatrix.needsUpdate = true;
      mesh.instanceColor.needsUpdate = true;
    }
  }, [position, seed]);
  
  return (
    <instancedMesh
      ref={meshRef}
      args={[new THREE.SphereGeometry(0.15, 8, 8), new THREE.MeshStandardMaterial({ vertexColors: true }), 8]}
      castShadow
      receiveShadow
    />
  );
}

// 植物组件
export default function Plant({ position, seed = 1 }: { position: [number, number, number]; key?: React.Key; seed?: number }) {
  return (
    <group position={position}>
      {/* 花盆 */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.8, 16]} />
        <meshStandardMaterial
          color="#6c4c2c"
          roughness={0.88}
          metalness={0.03}
        />
      </mesh>

      {/* 叶子 */}
      <LeavesInstanced position={[0, 0, 0]} seed={seed} />
    </group>
  );
}
