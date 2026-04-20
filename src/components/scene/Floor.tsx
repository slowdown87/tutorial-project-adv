import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// 地面组件
export default function Floor() {
  // 加载木纹纹理
  const woodTexture = useLoader(TextureLoader, 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dark%20wood%20floor%20texture%20high%20quality%20seamless%20oak&image_size=square');
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(5, 5); // 减少重复次数，使纹理更清晰
  
  return (
    <group>
      {/* 木地板基础层 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80, 40, 40]} />
        <meshStandardMaterial
          map={woodTexture}
          color="#5c4020" // 更深的颜色，与桌椅区分
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* 红色主地毯 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[30, 64]} />
        <meshStandardMaterial
          color="#4a151c"
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>

      {/* 地毯装饰边框 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[28, 30, 48]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}
