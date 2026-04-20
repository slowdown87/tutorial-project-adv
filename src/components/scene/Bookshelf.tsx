import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

// 书籍实例化渲染组件
function BooksInstanced({ position, shelfIndex, side = 'left' }: { position: [number, number, number]; shelfIndex: number; side?: 'left' | 'right' }) {
  const bookColors = [
    '#4a1010', '#0a3a0a', '#0a104a', '#4a2010', '#2a0a4a',
    '#c05050', '#5070a0', '#b08040', '#8060a0', '#40b040',
    '#d0b050', '#50a0c0', '#a05050', '#5050a0', '#80a050'
  ];
  
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const bookTexture = useLoader(TextureLoader, 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=book%20spine%20texture%20high%20quality%20seamless&image_size=square');
  bookTexture.wrapS = THREE.RepeatWrapping;
  bookTexture.wrapT = THREE.RepeatWrapping;
  bookTexture.repeat.set(1, 1);
  
  const matrix = new THREE.Matrix4();
  const color = new THREE.Color();
  
  useEffect(() => {
    if (meshRef.current) {
      const mesh = meshRef.current;
      const count = 15; // 增加书籍数量
      
      for (let i = 0; i < count; i++) {
        const seed = shelfIndex * 100 + i;
        const getRandom = (min: number, max: number) => {
          const x = Math.sin(seed) * 10000;
          return min + (x - Math.floor(x)) * (max - min);
        };
        
        // 更多样的书籍尺寸
        const height = 0.6 + getRandom(0, 0.6); // 增加高度变化
        const width = 0.2 + getRandom(0, 0.3); // 增加宽度变化
        const depth = 0.4 + getRandom(0, 0.2); // 增加深度变化
        const bookColor = bookColors[Math.floor(getRandom(0, bookColors.length))];
        const xPos = -2.4 + i * 0.35; // 调整间距，容纳更多书籍
        const rotation = getRandom(-0.08, 0.08); // 增加旋转角度
        
        // 设置位置
        matrix.makeTranslation(
          xPos,
          position[1],
          0.25 + (side === 'right' ? -0.05 : 0.05)
        );
        
        // 设置旋转
        matrix.multiply(new THREE.Matrix4().makeRotationZ(rotation));
        
        // 设置缩放
        matrix.multiply(new THREE.Matrix4().makeScale(width, height, depth));
        
        mesh.setMatrixAt(i, matrix);
        color.set(bookColor);
        mesh.setColorAt(i, color);
      }
      
      mesh.instanceMatrix.needsUpdate = true;
      mesh.instanceColor.needsUpdate = true;
    }
  }, [position, shelfIndex, side]);
  
  return (
    <instancedMesh
      ref={meshRef}
      args={[new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ 
        vertexColors: true,
        map: bookTexture,
        roughness: 0.7,
        metalness: 0.05
      }), 15]}
      castShadow
      receiveShadow
    />
  );
}

// 书架组件
export default function Bookshelf({ position, side = 'left' }: { position: [number, number, number]; side?: 'left' | 'right'; key?: React.Key }) {
  // 加载木纹纹理
  const woodTexture = useLoader(TextureLoader, 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dark%20wood%20texture%20high%20quality%20seamless&image_size=square');
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(2, 4);
  
  return (
    <group position={position}>
      {/* 书架主体 */}
      <mesh position={[0, 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 8, 0.6]} />
        <meshStandardMaterial
          map={woodTexture}
          color="#4c3020"
          roughness={0.78}
          metalness={0.05}
        />
      </mesh>

      {/* 书架层板 */}
      {[1, 2, 3, 4, 5, 6, 7].map((y) => (
        <mesh key={`shelf-${y}`} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.1, 0.15, 0.7]} />
          <meshStandardMaterial
            map={woodTexture}
            color="#3c2510"
            roughness={0.72}
            metalness={0.08}
          />
        </mesh>
      ))}

      {/* 填充书籍 */}
      {[1.5, 2.5, 3.5, 4.5, 5.5, 6.5].map((y, shelfIndex) => (
        <BooksInstanced
          key={`books-${shelfIndex}`}
          position={[0, y, 0]}
          shelfIndex={shelfIndex}
          side={side}
        />
      ))}
    </group>
  );
}
