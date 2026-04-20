import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// 阅读桌组件
export function ReadingDesk({ position }: { position: [number, number, number]; key?: React.Key }) {
  // 加载木纹纹理
  const woodTexture = useLoader(TextureLoader, 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=light%20wood%20texture%20high%20quality%20seamless&image_size=square');
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(2, 1);
  
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.15, 2]} />
        <meshStandardMaterial
          map={woodTexture}
          color="#7c5c2c"
          roughness={0.78}
          metalness={0.05}
        />
      </mesh>

      {[[-1.5, 0.8], [1.5, 0.8], [-1.5, -0.8], [1.5, -0.8]].map(([x, z], i) => (
        <mesh key={`leg-${i}`} position={[x, 0.5, z]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 1, 0.2]} />
          <meshStandardMaterial
            map={woodTexture}
            color="#4c3020"
            roughness={0.82}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* 桌上装饰书籍 */}
      <mesh position={[-0.5, 1.12, 0]} rotation={[0, Math.PI / 6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.4, 0.3]} />
        <meshStandardMaterial
          color="#406090"
          roughness={0.78}
          metalness={0.08}
        />
      </mesh>
    </group>
  );
}

// 椅子组件
export function Chair({ position }: { position: [number, number, number]; key?: React.Key }) {
  // 加载木纹纹理
  const woodTexture = useLoader(TextureLoader, 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=light%20wood%20texture%20high%20quality%20seamless&image_size=square');
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(1, 1);
  
  return (
    <group position={position}>
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.12, 0.8]} />
        <meshStandardMaterial
          map={woodTexture}
          color="#7c5c2c"
          roughness={0.78}
          metalness={0.06}
        />
      </mesh>

      {[[-0.3, 0.3], [0.3, 0.3], [-0.3, -0.3], [0.3, -0.3]].map(([x, z], i) => (
        <mesh key={`leg-${i}`} position={[x, 0.3, z]} castShadow receiveShadow>
          <cylinderGeometry args={[0.06, 0.08, 0.6, 8]} />
          <meshStandardMaterial
            map={woodTexture}
            color="#4c3020"
            roughness={0.82}
            metalness={0.05}
          />
        </mesh>
      ))}

      <mesh position={[0, 1.2, -0.3]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1, 0.12]} />
        <meshStandardMaterial
          map={woodTexture}
          color="#7c5c2c"
          roughness={0.78}
          metalness={0.06}
        />
      </mesh>
    </group>
  );
}
