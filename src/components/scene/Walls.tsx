import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// 墙壁组件
export default function Walls() {
  // 加载木纹纹理
  const woodTexture = useLoader(TextureLoader, 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wooden%20wall%20texture%20high%20quality%20seamless&image_size=square');
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(20, 2);
  
  return (
    <group>
      {/* 后墙 */}
      <mesh position={[0, 6, -40]} castShadow receiveShadow>
        <boxGeometry args={[80, 12, 0.5]} />
        <meshStandardMaterial
          map={woodTexture}
          color="#5c3a20"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* 左墙 */}
      <mesh position={[-40, 6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 12, 80]} />
        <meshStandardMaterial
          map={woodTexture}
          color="#5c3a20"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* 右墙 */}
      <mesh position={[40, 6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 12, 80]} />
        <meshStandardMaterial
          map={woodTexture}
          color="#5c3a20"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* 前墙 */}
      <mesh position={[0, 6, 40]} castShadow receiveShadow>
        <boxGeometry args={[80, 12, 0.5]} />
        <meshStandardMaterial
          map={woodTexture}
          color="#5c3a20"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
    </group>
  );
}
