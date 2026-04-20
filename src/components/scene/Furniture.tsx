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
  
  // 加载布料纹理
  const fabricTexture = useLoader(TextureLoader, 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fabric%20texture%20high%20quality%20seamless&image_size=square');
  fabricTexture.wrapS = fabricTexture.wrapT = THREE.RepeatWrapping;
  fabricTexture.repeat.set(1, 1);
  
  return (
    <group position={position}>
      {/* 桌面 */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.15, 2]} />
        <meshStandardMaterial
          map={woodTexture}
          color="#7c5c2c"
          roughness={0.78}
          metalness={0.05}
        />
      </mesh>

      {/* 桌腿 */}
      {[[-1.5, 0.8], [1.5, 0.8], [-1.5, -0.8], [1.5, -0.8]].map(([x, z], i) => (
        <mesh key={`leg-${i}`} position={[x, 0.5, z]} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.15, 1, 12]} />
          <meshStandardMaterial
            map={woodTexture}
            color="#4c3020"
            roughness={0.82}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* 桌底横梁 */}
      {[[-1.5, 0, 0], [1.5, 0, 0], [0, 0, 0.8], [0, 0, -0.8]].map(([x, y, z], i) => (
        <mesh key={`beam-${i}`} position={[x, y, z]} rotation={i < 2 ? [0, Math.PI / 2, 0] : [0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 0.1, 0.1]} />
          <meshStandardMaterial
            map={woodTexture}
            color="#4c3020"
            roughness={0.82}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* 桌上装饰物品 */}
      
      {/* 书籍堆 */}
      <group position={[-0.6, 1.12, 0.2]}>
        <mesh rotation={[0, Math.PI / 6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.4, 0.3]} />
          <meshStandardMaterial
            color="#406090"
            roughness={0.78}
            metalness={0.08}
          />
        </mesh>
        <mesh position={[0.1, 0.2, 0]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.15, 0.3, 0.25]} />
          <meshStandardMaterial
            color="#804040"
            roughness={0.78}
            metalness={0.08}
          />
        </mesh>
      </group>
      
      {/* 台灯 */}
      <group position={[1, 1.1, 0.5]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
          <meshStandardMaterial
            color="#b0b0b0"
            roughness={0.6}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.3, 0.2, 12]} />
          <meshStandardMaterial
            color="#d0d0d0"
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
      </group>
      
      {/* 笔记本 */}
      <mesh position={[0, 1.1, -0.3]} rotation={[0, Math.PI / 8, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.03, 0.25]} />
        <meshStandardMaterial
          map={fabricTexture}
          color="#ffffff"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
      
      {/* 水杯 */}
      <mesh position={[0.5, 1.1, -0.2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.15, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.3}
          metalness={0.0}
          transparent
          opacity={0.8}
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
  
  // 加载布料纹理
  const fabricTexture = useLoader(TextureLoader, 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fabric%20texture%20high%20quality%20seamless&image_size=square');
  fabricTexture.wrapS = fabricTexture.wrapT = THREE.RepeatWrapping;
  fabricTexture.repeat.set(1, 1);
  
  return (
    <group position={position}>
      {/* 座椅 */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.12, 0.8]} />
        <meshStandardMaterial
          map={woodTexture}
          color="#7c5c2c"
          roughness={0.78}
          metalness={0.06}
        />
      </mesh>

      {/* 椅垫 */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.75, 0.05, 0.75]} />
        <meshStandardMaterial
          map={fabricTexture}
          color="#806040"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* 椅腿 */}
      {[[-0.3, 0.3], [0.3, 0.3], [-0.3, -0.3], [0.3, -0.3]].map(([x, z], i) => (
        <mesh key={`leg-${i}`} position={[x, 0.3, z]} castShadow receiveShadow>
          <cylinderGeometry args={[0.06, 0.08, 0.6, 12]} />
          <meshStandardMaterial
            map={woodTexture}
            color="#4c3020"
            roughness={0.82}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* 椅背 */}
      <mesh position={[0, 1.2, -0.3]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1, 0.12]} />
        <meshStandardMaterial
          map={woodTexture}
          color="#7c5c2c"
          roughness={0.78}
          metalness={0.06}
        />
      </mesh>

      {/* 椅背衬垫 */}
      <mesh position={[0, 1.2, -0.35]} castShadow receiveShadow>
        <boxGeometry args={[0.75, 0.9, 0.08]} />
        <meshStandardMaterial
          map={fabricTexture}
          color="#604030"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* 椅背装饰 */}
      <mesh position={[0, 1.2, -0.38]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.7, 0.02]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}
