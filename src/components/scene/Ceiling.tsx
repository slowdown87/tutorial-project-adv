import React from 'react';

// 天花板组件
export default function Ceiling() {
  return (
    <group>
      {/* 木质天花板 */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 12, 0]} castShadow receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial
          color="#8c7050"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* 主吊灯 */}
      {[[0, 0], [-20, 20], [20, 20], [-20, -20], [20, -20]].map(([x, z], i) => (
        <group key={`chandelier-${i}`} position={[x, 11, z]}>
          <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.15, 0.2, 1, 8]} />
            <meshStandardMaterial
              color="#7a6a4a"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          <mesh position={[0, -0.8, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.8, 1.2, 0.8, 16]} />
            <meshStandardMaterial
              color="#fffde8"
              emissive="#fffde8"
              emissiveIntensity={0.6}
            />
          </mesh>

          <pointLight
            position={[0, -1.5, 0]}
            intensity={2}
            color="#fffde8"
            distance={20}
            decay={2}
            castShadow
          />
        </group>
      ))}
    </group>
  );
}
