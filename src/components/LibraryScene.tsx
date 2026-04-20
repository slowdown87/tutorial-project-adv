import { Text, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useState } from 'react';

// 更真实的地面纹理
function Floor() {
  return (
    <group>
      {/* 木地板基础层 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120, 60, 60]} />
        <meshStandardMaterial
          color="#7c5c3c"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* 木纹效果层 - 更密集的木板 */}
      {Array.from({ length: 24 }, (_, row) => (
        <group key={`wood-row-${row}`}>
          {Array.from({ length: 120 }, (_, col) => {
            // 每排随机颜色变化，模拟真实木纹
            const colorVariation = Math.random() * 0.1;
            const baseColor = row % 2 === 0 ? '#7c5c3c' : '#6c4c2c';
            const r = parseInt(baseColor.slice(1, 3), 16) + Math.floor(colorVariation * 255);
            const g = parseInt(baseColor.slice(3, 5), 16) + Math.floor(colorVariation * 255);
            const b = parseInt(baseColor.slice(5, 7), 16) + Math.floor(colorVariation * 255);
            const finalColor = `rgb(${Math.max(0, Math.min(255, r))}, ${Math.max(0, Math.min(255, g))}, ${Math.max(0, Math.min(255, b))})`;

            return (
              <mesh
                key={`wood-${row}-${col}`}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[
                  -60 + col * 1.0 + 0.5,
                  0.005,
                  -60 + row * 5 + 2.5
                ]}
                receiveShadow
              >
                <boxGeometry args={[0.98, 0.01, 4.8]} />
                <meshStandardMaterial
                  color={finalColor}
                  roughness={0.92}
                  metalness={0.0}
                />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* 红色主地毯 - 更有质感 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]} receiveShadow>
        <boxGeometry args={[80, 0.03, 80]} />
        <meshStandardMaterial
          color="#4a151c"
          roughness={0.98}
          metalness={0.0}
        />
      </mesh>

      {/* 地毯装饰边框 - 更精细 */}
      <group position={[0, 0.02, 0]}>
        {/* 外边框 */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[38, 40, 48]} />
          <meshStandardMaterial
            color="#8c6a2e"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
        {/* 内装饰边框 */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[35, 36, 48]} />
          <meshStandardMaterial
            color="#a68a38"
            roughness={0.65}
            metalness={0.25}
          />
        </mesh>
      </group>

      {/* 角落装饰地毯 - 圆形 */}
      {[[-35, -35], [35, -35], [-35, 35], [35, 35]].map(([x, z], i) => (
        <group key={`corner-rug-${i}`} position={[x, 0.025, z]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[8, 32]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#3c2510' : '#4a3015'}
              roughness={0.95}
              metalness={0.0}
            />
          </mesh>
          {/* 装饰边框 */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
            <ringGeometry args={[7, 8, 32]} />
            <meshStandardMaterial
              color="#7a5a2a"
              roughness={0.75}
              metalness={0.15}
            />
          </mesh>
        </group>
      ))}

      {/* 中央圆形装饰 */}
      <group position={[0, 0.035, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[12, 64]} />
          <meshStandardMaterial
            color="#7a5a2a"
            roughness={0.65}
            metalness={0.3}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
          <ringGeometry args={[10, 12, 64]} />
          <meshStandardMaterial
            color="#9a7a3a"
            roughness={0.6}
            metalness={0.35}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[8, 10, 64]} />
          <meshStandardMaterial
            color="#a68a38"
            roughness={0.55}
            metalness={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}

// 更真实的天花板
function Ceiling() {
  return (
    <group>
      {/* 木质天花板 */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 15, 0]} castShadow receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial
          color="#8c7050"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* 天花板横梁 */}
      {Array.from({ length: 13 }, (_, row) => (
        <group key={`beam-row-${row}`}>
          {/* 横向梁 */}
          <mesh position={[0, 14.8, -60 + row * 10]} castShadow receiveShadow>
            <boxGeometry args={[120, 0.5, 0.7]} />
            <meshStandardMaterial
              color="#5c4030"
              roughness={0.8}
              metalness={0.05}
            />
          </mesh>
          {/* 纵向梁 */}
          {row % 2 === 0 && (
            <mesh position={[-60 + row * 10, 14.8, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.7, 0.5, 120]} />
              <meshStandardMaterial
                color="#5c4030"
                roughness={0.8}
                metalness={0.05}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* 吊灯装饰 - 更多更精致 */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 20;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <group key={`chandelier-${i}`} position={[x, 14, z]}>
            {/* 吊灯支架 */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.18, 0.28, 1.8, 16]} />
              <meshStandardMaterial
                color="#7a6a4a"
                metalness={0.75}
                roughness={0.25}
              />
            </mesh>

            {/* 灯罩 */}
            <mesh position={[0, -1.2, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[1.3, 1.8, 1, 32]} />
              <meshStandardMaterial
                color="#fffde8"
                emissive="#fffde8"
                emissiveIntensity={0.7}
                roughness={0.3}
                metalness={0.05}
              />
            </mesh>

            {/* 光源 */}
            <pointLight
              position={[0, -2, 0]}
              intensity={2}
              color="#fffde8"
              distance={25}
              decay={2}
              castShadow
            />
          </group>
        );
      })}

      {/* 主吊灯 */}
      {[[-30, 30], [30, 30], [-30, -30], [30, -30], [0, 0]].map(([x, z], i) => (
        <group key={`central-chandelier-${i}`} position={[x, 14, z]}>
          <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.32, 0.42, 2.3, 16]} />
            <meshStandardMaterial
              color="#7a6a4a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          <mesh position={[0, -1.3, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[2.6, 3.3, 1.2, 32]} />
            <meshStandardMaterial
              color="#fffde8"
              emissive="#fffde8"
              emissiveIntensity={0.9}
            />
          </mesh>

          <pointLight
            position={[0, -2.6, 0]}
            intensity={3.5}
            color="#fffde8"
            distance={35}
            decay={2}
            castShadow
          />
        </group>
      ))}
    </group>
  );
}

// 真实的墙壁
function Walls() {
  return (
    <group>
      {/* 后墙 */}
      <mesh position={[0, 7.5, -60]} castShadow receiveShadow>
        <boxGeometry args={[120, 15, 0.6]} />
        <meshStandardMaterial
          color="#5c3a20"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* 左墙 */}
      <mesh position={[-60, 7.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 15, 120]} />
        <meshStandardMaterial
          color="#5c3a20"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* 右墙 */}
      <mesh position={[60, 7.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 15, 120]} />
        <meshStandardMaterial
          color="#5c3a20"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* 前墙 */}
      <mesh position={[0, 7.5, 60]} castShadow receiveShadow>
        <boxGeometry args={[120, 15, 0.6]} />
        <meshStandardMaterial
          color="#5c3a20"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* 墙裙 - 更厚实 */}
      {[[-60, 1, 0, 0.7, 2.5, 120], [60, 1, 0, 0.7, 2.5, 120], [0, 1, -60, 120, 2.5, 0.7], [0, 1, 60, 120, 2.5, 0.7]].map(([x, y, z, w, h, d], i) => (
        <mesh key={`wainscoting-${i}`} position={[x, y, z]} castShadow receiveShadow>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial
            color="#3c2510"
            roughness={0.85}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

// 更真实的书架
function Bookshelf({ position, side = 'left' }: { position: [number, number, number]; side?: 'left' | 'right' }) {
  const bookColors = [
    '#4a1010', '#0a3a0a', '#0a104a', '#4a2010', '#2a0a4a',
    '#4a0a0a', '#0a2a3a', '#2a3a0a', '#c05050', '#5070a0',
    '#b08040', '#8060a0', '#40b040', '#f06040', '#3080d0',
    '#f070b0', '#80c0e0', '#80f080', '#f0d060', '#d0a0c0'
  ];

  return (
    <group position={position}>
      {/* 书架主体 */}
      <mesh position={[0, 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 8, 0.8]} />
        <meshStandardMaterial
          color="#4c3020"
          roughness={0.78}
          metalness={0.05}
        />
      </mesh>

      {/* 书架层板 - 更厚更有质感 */}
      {[1, 2, 3, 4, 5, 6, 7].map((y) => (
        <mesh key={`shelf-${y}`} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.15, 0.22, 0.9]} />
          <meshStandardMaterial
            color="#3c2510"
            roughness={0.72}
            metalness={0.08}
          />
        </mesh>
      ))}

      {/* 书架侧柱 */}
      <mesh position={[-3, 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 8.15, 0.9]} />
        <meshStandardMaterial
          color="#2c1a10"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[3, 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 8.15, 0.9]} />
        <meshStandardMaterial
          color="#2c1a10"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* 填充书籍 - 更多变化 */}
      {[1.5, 2.5, 3.5, 4.5, 5.5, 6.5].map((y, shelfIndex) => (
        <group key={`books-${shelfIndex}`}>
          {Array.from({ length: 26 }, (_, bookIndex) => {
            const height = 0.75 + Math.random() * 0.55;
            const width = 0.18 + Math.random() * 0.18;
            const depth = 0.65 + Math.random() * 0.1;
            const color = bookColors[Math.floor(Math.random() * bookColors.length)];
            const xPos = -2.9 + bookIndex * 0.23;
            const rotation = (Math.random() - 0.5) * 0.12;

            return (
              <mesh
                key={`book-${shelfIndex}-${bookIndex}`}
                position={[xPos, y, 0.3 + (side === 'right' ? -0.1 : 0.1)]}
                rotation={[0, 0, rotation]}
                castShadow receiveShadow
              >
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial
                  color={color}
                  roughness={0.85}
                  metalness={0.03}
                />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

// 特殊书架
function SpecialBookshelf({ position }: { position: [number, number, number] }) {
  const bookColors = [
    '#d0a040', '#f0d060', '#e0d090', '#fffad0', '#faf5c0',
    '#ffffd0', '#f0d0a0', '#fdf5e0', '#fffaf0', '#f0f0d0'
  ];

  return (
    <group position={position}>
      <mesh position={[0, 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 8, 1.0]} />
        <meshStandardMaterial
          color="#5c3a20"
          roughness={0.72}
          metalness={0.12}
        />
      </mesh>

      {[1, 2, 3, 4, 5, 6, 7].map((y) => (
        <mesh key={`special-shelf-${y}`} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.65, 0.25, 1.1]} />
          <meshStandardMaterial
            color="#4c3015"
            roughness={0.68}
            metalness={0.15}
          />
        </mesh>
      ))}

      <mesh position={[-2.25, 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.35, 8.2, 1.1]} />
        <meshStandardMaterial
          color="#3c2510"
          roughness={0.75}
          metalness={0.12}
        />
      </mesh>
      <mesh position={[2.25, 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.35, 8.2, 1.1]} />
        <meshStandardMaterial
          color="#3c2510"
          roughness={0.75}
          metalness={0.12}
        />
      </mesh>

      {[1.5, 2.5, 3.5, 4.5, 5.5, 6.5].map((y, shelfIndex) => (
        <group key={`special-books-${shelfIndex}`}>
          {Array.from({ length: 18 }, (_, bookIndex) => {
            const height = 0.78 + Math.random() * 0.52;
            const width = 0.2 + Math.random() * 0.16;
            const depth = 0.75 + Math.random() * 0.15;
            const color = bookColors[Math.floor(Math.random() * bookColors.length)];
            const xPos = -1.9 + bookIndex * 0.22;
            const rotation = (Math.random() - 0.5) * 0.1;

            return (
              <mesh
                key={`special-book-${shelfIndex}-${bookIndex}`}
                position={[xPos, y, 0.4]}
                rotation={[0, 0, rotation]}
                castShadow receiveShadow
              >
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial
                  color={color}
                  roughness={0.82}
                  metalness={0.08}
                />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

// 阅读桌
function ReadingDesk({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.25, 2.4]} />
        <meshStandardMaterial
          color="#7c5c2c"
          roughness={0.78}
          metalness={0.05}
        />
      </mesh>

      {[[-1.7, 1.0], [1.7, 1.0], [-1.7, -1.0], [1.7, -1.0]].map(([x, z], i) => (
        <mesh key={`leg-${i}`} position={[x, 0.65, z]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 1.3, 0.3]} />
          <meshStandardMaterial
            color="#4c3020"
            roughness={0.82}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* 桌上装饰书籍 */}
      <mesh position={[-0.6, 1.45, 0]} rotation={[0, Math.PI / 6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.26, 0.55, 0.36]} />
        <meshStandardMaterial
          color="#406090"
          roughness={0.78}
          metalness={0.08}
        />
      </mesh>

      <mesh position={[1.0, 1.45, 0.4]} rotation={[0, Math.PI / 5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.21, 0.46, 0.31]} />
        <meshStandardMaterial
          color="#b04040"
          roughness={0.8}
          metalness={0.06}
        />
      </mesh>

      {/* 台灯 - 更精致 */}
      <group position={[-1.3, 1.55, 0.6]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.1, 0.16, 0.5, 8]} />
          <meshStandardMaterial
            color="#3c2510"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.32, 0.32, 16]} />
          <meshStandardMaterial
            color="#fffde8"
            emissive="#fffde8"
            emissiveIntensity={0.4}
            roughness={0.55}
            metalness={0.1}
          />
        </mesh>
        <pointLight
          position={[0, 0.55, 0]}
          intensity={1.8}
          color="#fffde8"
          distance={10}
          decay={2}
          castShadow
        />
      </group>
    </group>
  );
}

// 椅子
function Chair({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.78, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.22, 1.0]} />
        <meshStandardMaterial
          color="#7c5c2c"
          roughness={0.78}
          metalness={0.06}
        />
      </mesh>

      {[[-0.42, 0.42], [0.42, 0.42], [-0.42, -0.42], [0.42, -0.42]].map(([x, z], i) => (
        <mesh key={`leg-${i}`} position={[x, 0.39, z]} castShadow receiveShadow>
          <cylinderGeometry args={[0.09, 0.12, 0.78, 8]} />
          <meshStandardMaterial
            color="#4c3020"
            roughness={0.82}
            metalness={0.05}
          />
        </mesh>
      ))}

      <mesh position={[0, 1.55, -0.42]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 1.35, 0.22]} />
        <meshStandardMaterial
          color="#7c5c2c"
          roughness={0.78}
          metalness={0.06}
        />
      </mesh>
    </group>
  );
}

// 植物
function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 花盆 */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.52, 1.0, 16]} />
        <meshStandardMaterial
          color="#6c4c2c"
          roughness={0.88}
          metalness={0.03}
        />
      </mesh>

      {/* 泥土 */}
      <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.48, 0.3, 16]} />
        <meshStandardMaterial
          color="#3c2510"
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* 叶子 - 更自然 */}
      {Array.from({ length: 18 }, (_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const radius = 0.45 + Math.random() * 0.35;
        const height = 1.4 + Math.random() * 0.8;
        const scale = 0.7 + Math.random() * 0.6;
        return (
          <mesh
            key={`leaf-${i}`}
            position={[
              Math.cos(angle) * radius,
              1.3 + height,
              Math.sin(angle) * radius
            ]}
            rotation={[Math.random() * 0.6, angle, Math.random() * 0.35]}
            scale={[scale, scale, scale]}
            castShadow receiveShadow
          >
            <sphereGeometry args={[0.18 + Math.random() * 0.12, 8, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#1a7a1a' : '#2a9a2a'}
              roughness={0.92}
              metalness={0.02}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// 柱子
function Column({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 柱身 */}
      <mesh position={[0, 7.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.2, 2.6, 15, 48]} />
        <meshStandardMaterial
          color="#d0c0a0"
          roughness={0.82}
          metalness={0.08}
        />
      </mesh>

      {/* 柱头 */}
      <mesh position={[0, 14.9, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.0, 2.6, 1.0, 48]} />
        <meshStandardMaterial
          color="#c0b090"
          roughness={0.78}
          metalness={0.1}
        />
      </mesh>

      {/* 柱基 */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.0, 2.6, 1.2, 48]} />
        <meshStandardMaterial
          color="#c0b090"
          roughness={0.78}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

// 窗户
function Window({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 窗框 */}
      <mesh position={[0, 7.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.2, 11.2, 0.3]} />
        <meshStandardMaterial
          color="#4c3020"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* 玻璃 */}
      <mesh position={[0, 7.5, 0.15]}>
        <boxGeometry args={[5.4, 10.4, 0.08]} />
        <meshStandardMaterial
          color="#80c0e0"
          transparent
          opacity={0.5}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* 窗格 */}
      {/* 中竖框 */}
      <mesh position={[0, 7.5, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 10.8, 0.12]} />
        <meshStandardMaterial
          color="#3c2510"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>
      {/* 中横框 */}
      <mesh position={[0, 5.2, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[5.4, 0.18, 0.12]} />
        <meshStandardMaterial
          color="#3c2510"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0, 9.8, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[5.4, 0.18, 0.12]} />
        <meshStandardMaterial
          color="#3c2510"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* 窗外光线 */}
      <pointLight
        position={[0, 7.5, 0.4]}
        intensity={1.0}
        color="#a0d0f0"
        distance={18}
        decay={2}
      />
    </group>
  );
}

// 装饰物品
function DecorativeItem({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 花瓶 */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.26, 0.55, 16]} />
        <meshStandardMaterial
          color="#a08040"
          metalness={0.78}
          roughness={0.28}
        />
      </mesh>
      {/* 瓶身 */}
      <mesh position={[0, 1.15, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial
          color="#e070a0"
          roughness={0.88}
          metalness={0.05}
        />
      </mesh>
      {/* 瓶口 */}
      <mesh position={[0, 1.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.18, 0.28, 16]} />
        <meshStandardMaterial
          color="#a08040"
          metalness={0.78}
          roughness={0.28}
        />
      </mesh>
    </group>
  );
}

// 图书管理员
function Librarian({ position }: { position: [number, number, number] }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogue] = useState([
    "欢迎来到智慧图书馆！",
    "这里有丰富的知识等待探索。",
    "需要帮助找到什么书籍吗？",
    "祝你在知识的海洋中遨游愉快！"
  ]);
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);

  const handleClick = () => {
    if (currentDialogIndex < dialogue.length - 1) {
      setCurrentDialogIndex(currentDialogIndex + 1);
    } else {
      setCurrentDialogIndex(0);
      setIsDialogOpen(false);
    }
    setIsDialogOpen(true);
  };

  return (
    <group position={position}>
      <mesh
        position={[0, 1.5, 0]}
        scale={[1.5, 1.5, 1.5]}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'default';
        }}
        castShadow receiveShadow
      >
        <cylinderGeometry args={[0.5, 0.5, 1, 16]} />
        <meshStandardMaterial
          color="#e0b090"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#e0b090"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      <mesh position={[0, 2.5, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.65, 0.85, 0.12]} />
        <meshStandardMaterial
          color="#406090"
          roughness={0.78}
          metalness={0.08}
        />
      </mesh>

      <Text
        position={[0, 0.5, 0]}
        fontSize={0.55}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        点击对话
      </Text>

      {isDialogOpen && (
        <group position={[0, 3.6, 0]}>
          <mesh position={[0, 0, -0.1]}>
            <boxGeometry args={[3.5, 1.7, 0.12]} />
            <meshStandardMaterial
              color="#2c1a1d"
              roughness={0.95}
              metalness={0.05}
            />
          </mesh>
          <Text
            position={[0, 0, 0]}
            fontSize={0.44}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {dialogue[currentDialogIndex]}
          </Text>
        </group>
      )}
    </group>
  );
}

// 桌子
function Table({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.16, 1.25]} />
        <meshStandardMaterial
          color="#7c5c2c"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {[[-1.0, 0.5], [1.0, 0.5], [-1.0, -0.5], [1.0, -0.5]].map(([x, z], i) => (
        <mesh key={`leg-${i}`} position={[x, 0.45, z]} castShadow receiveShadow>
          <cylinderGeometry args={[0.1, 0.13, 0.9, 8]} />
          <meshStandardMaterial
            color="#4c3020"
            roughness={0.85}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function LibraryScene() {
  return (
    <>
      {/* 环境光 - 更柔和 */}
      <ambientLight intensity={0.6} color="#f0e0d0" />

      {/* 主方向光 - 更好的阴影 */}
      <directionalLight
        position={[50, 60, 50]}
        intensity={2.5}
        color="#fffde8"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-70}
        shadow-camera-right={70}
        shadow-camera-top={70}
        shadow-camera-bottom={-70}
      />

      {/* 补充点光源 */}
      <pointLight position={[0, 13, 0]} intensity={1.8} color="#fffde8" distance={50} decay={2} />
      <pointLight position={[45, 11, 45]} intensity={1.5} color="#f0e0d0" distance={45} decay={2} />
      <pointLight position={[-45, 11, -45]} intensity={1.5} color="#f0e0d0" distance={45} decay={2} />

      {/* 场景元素 */}
      <Floor />
      <Walls />
      <Ceiling />

      {/* 普通书架 */}
      {[[-55, -45], [-55, -30], [-55, -15], [-55, 0], [-55, 15], [-55, 30], [-55, 45],
        [55, -45], [55, -30], [55, -15], [55, 0], [55, 15], [55, 30], [55, 45]].map(([x, z], i) => (
        <Bookshelf key={`shelf-${i}`} position={[x, 0, z]} side={x < 0 ? 'left' : 'right'} />
      ))}

      {/* 前后墙书架 */}
      {[[-45, -55], [-30, -55], [-15, -55], [0, -55], [15, -55], [30, -55], [45, -55],
        [-45, 55], [-30, 55], [-15, 55], [0, 55], [15, 55], [30, 55], [45, 55]].map(([x, z], i) => (
        <Bookshelf key={`back-shelf-${i}`} position={[x, 0, z]} side={z < 0 ? 'left' : 'right'} />
      ))}

      {/* 阅读桌 */}
      {[[-35, -35], [35, -35], [-35, 35], [35, 35], [0, -35], [0, 35], [-35, 0], [35, 0]].map(([x, z], i) => (
        <ReadingDesk key={`desk-${i}`} position={[x, 0, z]} />
      ))}

      {/* 椅子 */}
      {[[-35, -40], [35, -40], [-35, 40], [35, 40], [0, -40], [0, 40], [-40, 0], [40, 0]].map(([x, z], i) => (
        <Chair key={`chair-${i}`} position={[x, 0, z]} />
      ))}

      {/* 植物 */}
      {[[-50, 0], [50, 0], [0, -50], [0, 50], [-28, -28], [28, -28], [-28, 28], [28, 28], [-18, -18], [18, -18], [-18, 18], [18, 18]].map(([x, z], i) => (
        <Plant key={`plant-${i}`} position={[x, 0, z]} />
      ))}

      {/* 柱子 */}
      {[[-35, 0], [35, 0], [0, -35], [0, 35], [-20, -20], [20, -20], [-20, 20], [20, 20], [-10, -10], [10, -10], [-10, 10], [10, 10]].map(([x, z], i) => (
        <Column key={`column-${i}`} position={[x, 0, z]} />
      ))}

      {/* 窗户 */}
      {[[-45, -55], [-30, -55], [-15, -55], [0, -55], [15, -55], [30, -55], [45, -55],
        [-45, 55], [-30, 55], [-15, 55], [0, 55], [15, 55], [30, 55], [45, 55]].map(([x, z], i) => (
        <Window key={`window-${i}`} position={[x, 0, z > 0 ? 59.85 : -59.85]} />
      ))}

      {/* 装饰物品 */}
      {[[-15, -15], [15, -15], [-15, 15], [15, 15]].map(([x, z], i) => (
        <DecorativeItem key={`decor-${i}`} position={[x, 0, z]} />
      ))}

      {/* 桌子 */}
      {[[-7, -7], [7, -7], [-7, 7], [7, 7]].map(([x, z], i) => (
        <Table key={`table-${i}`} position={[x, 0, z]} />
      ))}

      {/* 特殊书架 */}
      {[[-22, 0], [22, 0]].map(([x, z], i) => (
        <SpecialBookshelf key={`special-shelf-${i}`} position={[x, 0, z]} />
      ))}

      {/* 图书管理员 */}
      <Librarian position={[0, 0, 0]} />

      {/* 光效粒子 */}
      <Sparkles count={300} scale={120} size={3} speed={1.5} opacity={0.5} color="#fffde8" />

      {/* 标题 */}
      <Text
        position={[0, 13, 0]}
        fontSize={5.2}
        color="#d0a040"
        anchorX="center"
        anchorY="middle"
      >
        智慧图书馆
      </Text>
    </>
  );
}
