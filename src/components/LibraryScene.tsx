import { Text, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useState } from 'react';

// 更真实的地面纹理
function Floor() {
  return (
    <group>
      {/* 木地板基础层 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[120, 120, 100, 100]} />
        <meshStandardMaterial
          color="#8B7355"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* 木纹效果层 */}
      {Array.from({ length: 12 }, (_, i) => (
        <group key={`wood-group-${i}`}>
          {/* 纵向木板纹理 */}
          {Array.from({ length: 80 }, (_, j) => (
            <mesh
              key={`wood-${i}-${j}`}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[
                -60 + j * 1.5,
                0.01,
                -60 + i * 10
              ]}
            >
              <boxGeometry args={[1.4, 0.02, 9.8]} />
              <meshStandardMaterial
                color={
                  j % 3 === 0 ? '#7A6349' : 
                  j % 3 === 1 ? '#8B7355' : 
                  '#9C8461'
                }
                roughness={0.88}
                metalness={0.03}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* 红色主地毯 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <boxGeometry args={[80, 0.02, 80]} />
        <meshStandardMaterial
          color="#5C0A1A"
          roughness={0.95}
          metalness={0.01}
        />
      </mesh>

      {/* 地毯边框 */}
      <group position={[0, 0.04, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[38, 40, 32]} />
          <meshStandardMaterial
            color="#C9A227"
            roughness={0.8}
            metalness={0.15}
          />
        </mesh>
      </group>

      {/* 角落装饰地毯 */}
      {[[-35, -35], [35, -35], [-35, 35], [35, 35]].map(([x, z], i) => (
        <mesh
          key={`rug-corner-${i}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[x, 0.05, z]}
        >
          <circleGeometry args={[10, 32]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#3D2817' : '#5C4033'}
            roughness={0.92}
            metalness={0.08}
          />
        </mesh>
      ))}

      {/* 中央圆形装饰 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <circleGeometry args={[8, 32]} />
        <meshStandardMaterial
          color="#C9A227"
          roughness={0.7}
          metalness={0.25}
        />
      </mesh>
      
      {/* 木板接缝线 */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh
          key={`seam-${i}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.07, -60 + i * 10]}
        >
          <boxGeometry args={[120, 0.005, 0.1]} />
          <meshStandardMaterial
            color="#2A1F14"
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

// 更真实的天花板
function Ceiling() {
  return (
    <group>
      {/* 木质天花板 */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 15, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial
          color="#9C8461"
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* 天花板横梁 */}
      {Array.from({ length: 13 }, (_, i) => (
        <group key={`beam-${i}`}>
          {/* 横向梁 */}
          <mesh position={[0, 14.8, -60 + i * 10]}>
            <boxGeometry args={[120, 0.4, 0.6]} />
            <meshStandardMaterial
              color="#5C4033"
              roughness={0.75}
              metalness={0.08}
            />
          </mesh>
          {/* 纵向梁 */}
          {i % 2 === 0 && (
            <mesh position={[-60 + i * 10, 14.8, 0]}>
              <boxGeometry args={[0.6, 0.4, 120]} />
              <meshStandardMaterial
                color="#5C4033"
                roughness={0.75}
                metalness={0.08}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* 吊灯装饰 */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 25;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <group key={`chandelier-${i}`} position={[x, 14, z]}>
            {/* 吊灯支架 */}
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.2, 0.3, 2, 16]} />
              <meshStandardMaterial
                color="#8B7355"
                metalness={0.7}
                roughness={0.25}
              />
            </mesh>

            {/* 灯罩 */}
            <mesh position={[0, -1, 0]}>
              <cylinderGeometry args={[1.5, 2.2, 1, 32]} />
              <meshStandardMaterial
                color="#FFF8DC"
                emissive="#FFF8DC"
                emissiveIntensity={0.8}
                roughness={0.3}
                metalness={0.05}
              />
            </mesh>

            {/* 光源 */}
            <pointLight
              position={[0, -2, 0]}
              intensity={2.5}
              color="#FFF8DC"
              distance={25}
              decay={2}
            />
          </group>
        );
      })}

      {/* 主吊灯 */}
      {[[-30, 30], [30, 30], [-30, -30], [30, -30], [0, 0]].map(([x, z], i) => (
        <group key={`central-chandelier-${i}`} position={[x, 14, z]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.35, 0.45, 2.5, 16]} />
            <meshStandardMaterial
              color="#8B7355"
              metalness={0.75}
              roughness={0.2}
            />
          </mesh>

          <mesh position={[0, -1.2, 0]}>
            <cylinderGeometry args={[2.8, 3.5, 1.2, 32]} />
            <meshStandardMaterial
              color="#FFF8DC"
              emissive="#FFF8DC"
              emissiveIntensity={1}
            />
          </mesh>

          <pointLight
            position={[0, -2.5, 0]}
            intensity={3.5}
            color="#FFF8DC"
            distance={30}
            decay={2}
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
      <mesh position={[0, 7.5, -60]}>
        <boxGeometry args={[120, 15, 0.5]} />
        <meshStandardMaterial
          color="#6B4423"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* 左墙 */}
      <mesh position={[-60, 7.5, 0]}>
        <boxGeometry args={[0.5, 15, 120]} />
        <meshStandardMaterial
          color="#6B4423"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* 右墙 */}
      <mesh position={[60, 7.5, 0]}>
        <boxGeometry args={[0.5, 15, 120]} />
        <meshStandardMaterial
          color="#6B4423"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* 前墙 */}
      <mesh position={[0, 7.5, 60]}>
        <boxGeometry args={[120, 15, 0.5]} />
        <meshStandardMaterial
          color="#6B4423"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* 墙裙 */}
      {[[-60, 1, 0, 0.5, 2, 120], [60, 1, 0, 0.5, 2, 120], [0, 1, -60, 120, 2, 0.5], [0, 1, 60, 120, 2, 0.5]].map(([x, y, z, w, h, d], i) => (
        <mesh key={`wainscoting-${i}`} position={[x, y, z]}>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial
            color="#3D2817"
            roughness={0.75}
            metalness={0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

// 更真实的书架
function Bookshelf({ position, side = 'left' }: { position: [number, number, number]; side?: 'left' | 'right' }) {
  const bookColors = [
    '#5C0A1A', '#0A3D0A', '#0A1A5C', '#5C2A0A', '#2A0A5C',
    '#5C0A0A', '#0A2A3D', '#2A3D0A', '#CD5C5C', '#4682B4',
    '#DAA520', '#9370DB', '#32CD32', '#FF6347', '#1E90FF',
    '#FF69B4', '#87CEEB', '#98FB98', '#FFD700', '#DDA0DD'
  ];

  return (
    <group position={position}>
      {/* 书架主体 */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[6, 8, 0.6]} />
        <meshStandardMaterial
          color="#5C4033"
          roughness={0.72}
          metalness={0.06}
        />
      </mesh>

      {/* 书架层板 */}
      {[1, 2, 3, 4, 5, 6, 7].map((y) => (
        <mesh key={`shelf-${y}`} position={[0, y, 0]}>
          <boxGeometry args={[6.1, 0.15, 0.7]} />
          <meshStandardMaterial
            color="#3D2817"
            roughness={0.65}
            metalness={0.08}
          />
        </mesh>
      ))}

      {/* 书架侧柱 */}
      <mesh position={[-3, 4, 0]}>
        <boxGeometry args={[0.25, 8.1, 0.7]} />
        <meshStandardMaterial
          color="#2A1F14"
          roughness={0.75}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[3, 4, 0]}>
        <boxGeometry args={[0.25, 8.1, 0.7]} />
        <meshStandardMaterial
          color="#2A1F14"
          roughness={0.75}
          metalness={0.05}
        />
      </mesh>

      {/* 填充书籍 */}
      {[1.5, 2.5, 3.5, 4.5, 5.5, 6.5].map((y, shelfIndex) => (
        <group key={`books-${shelfIndex}`}>
          {Array.from({ length: 22 }).map((_, bookIndex) => {
            const height = 0.85 + Math.random() * 0.45;
            const width = 0.22 + Math.random() * 0.16;
            const depth = 0.52;
            const color = bookColors[Math.floor(Math.random() * bookColors.length)];
            const xPos = -2.85 + bookIndex * 0.26;
            const rotation = (Math.random() - 0.5) * 0.12;

            return (
              <mesh
                key={`book-${shelfIndex}-${bookIndex}`}
                position={[xPos, y, 0.27 + (side === 'right' ? -0.1 : 0.1)]}
                rotation={[0, 0, rotation]}
              >
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial
                  color={color}
                  roughness={0.82}
                  metalness={0.04}
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
    '#C9A227', '#FFD700', '#F0E68C', '#FFFACD', '#FAFAD2',
    '#FFFFE0', '#F5DEB3', '#FDF5E6', '#FFFAF0', '#F5F5DC'
  ];

  return (
    <group position={position}>
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[4, 8, 0.8]} />
        <meshStandardMaterial
          color="#6B4423"
          roughness={0.68}
          metalness={0.12}
        />
      </mesh>

      {[1, 2, 3, 4, 5, 6, 7].map((y) => (
        <mesh key={`special-shelf-${y}`} position={[0, y, 0]}>
          <boxGeometry args={[4.1, 0.18, 0.9]} />
          <meshStandardMaterial
            color="#4A3020"
            roughness={0.6}
            metalness={0.15}
          />
        </mesh>
      ))}

      <mesh position={[-2, 4, 0]}>
        <boxGeometry args={[0.28, 8.1, 0.9]} />
        <meshStandardMaterial
          color="#3D2817"
          roughness={0.7}
          metalness={0.12}
        />
      </mesh>
      <mesh position={[2, 4, 0]}>
        <boxGeometry args={[0.28, 8.1, 0.9]} />
        <meshStandardMaterial
          color="#3D2817"
          roughness={0.7}
          metalness={0.12}
        />
      </mesh>

      {[1.5, 2.5, 3.5, 4.5, 5.5, 6.5].map((y, shelfIndex) => (
        <group key={`special-books-${shelfIndex}`}>
          {Array.from({ length: 15 }).map((_, bookIndex) => {
            const height = 0.88 + Math.random() * 0.42;
            const width = 0.24 + Math.random() * 0.14;
            const depth = 0.68;
            const color = bookColors[Math.floor(Math.random() * bookColors.length)];
            const xPos = -1.8 + bookIndex * 0.25;
            const rotation = (Math.random() - 0.5) * 0.1;

            return (
              <mesh
                key={`special-book-${shelfIndex}-${bookIndex}`}
                position={[xPos, y, 0.34]}
                rotation={[0, 0, rotation]}
              >
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial
                  color={color}
                  roughness={0.78}
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
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[3.8, 0.2, 2]} />
        <meshStandardMaterial
          color="#8B6914"
          roughness={0.75}
          metalness={0.05}
        />
      </mesh>

      {[[-1.6, 0.8], [1.6, 0.8], [-1.6, -0.8], [1.6, -0.8]].map(([x, z], i) => (
        <mesh key={`leg-${i}`} position={[x, 0.6, z]}>
          <boxGeometry args={[0.25, 1.2, 0.25]} />
          <meshStandardMaterial
            color="#5C4033"
            roughness={0.78}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* 桌上装饰书籍 */}
      <mesh position={[-0.5, 1.35, 0]} rotation={[0, Math.PI / 5, 0]}>
        <boxGeometry args={[0.22, 0.45, 0.32]} />
        <meshStandardMaterial
          color="#4682B4"
          roughness={0.72}
          metalness={0.08}
        />
      </mesh>

      <mesh position={[0.8, 1.35, 0.3]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.18, 0.38, 0.28]} />
        <meshStandardMaterial
          color="#CD5C5C"
          roughness={0.75}
          metalness={0.06}
        />
      </mesh>

      {/* 台灯 */}
      <mesh position={[-1, 1.5, 0.5]}>
        <cylinderGeometry args={[0.08, 0.12, 0.4, 8]} />
        <meshStandardMaterial
          color="#3D2817"
          roughness={0.65}
          metalness={0.15}
        />
      </mesh>
      <mesh position={[-1, 1.75, 0.5]}>
        <coneGeometry args={[0.25, 0.25, 16]} />
        <meshStandardMaterial
          color="#FFF8DC"
          emissive="#FFF8DC"
          emissiveIntensity={0.3}
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>
      <pointLight
        position={[-1, 1.8, 0.5]}
        intensity={1.5}
        color="#FFF8DC"
        distance={8}
        decay={2}
      />
    </group>
  );
}

// 椅子
function Chair({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.72, 0]}>
        <boxGeometry args={[0.85, 0.18, 0.85]} />
        <meshStandardMaterial
          color="#8B6914"
          roughness={0.7}
          metalness={0.06}
        />
      </mesh>

      {[[-0.35, 0.35], [0.35, 0.35], [-0.35, -0.35], [0.35, -0.35]].map(([x, z], i) => (
        <mesh key={`leg-${i}`} position={[x, 0.36, z]}>
          <cylinderGeometry args={[0.08, 0.1, 0.72, 8]} />
          <meshStandardMaterial
            color="#5C4033"
            roughness={0.75}
            metalness={0.05}
          />
        </mesh>
      ))}

      <mesh position={[0, 1.45, -0.35]}>
        <boxGeometry args={[0.85, 1.1, 0.18]} />
        <meshStandardMaterial
          color="#8B6914"
          roughness={0.7}
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
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.8, 16]} />
        <meshStandardMaterial
          color="#8B6914"
          roughness={0.82}
          metalness={0.03}
        />
      </mesh>

      {/* 泥土 */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.33, 0.38, 0.2, 16]} />
        <meshStandardMaterial
          color="#3D2817"
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* 叶子 */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.4 + Math.random() * 0.3;
        const height = 1.2 + Math.random() * 0.6;
        return (
          <mesh
            key={`leaf-${i}`}
            position={[
              Math.cos(angle) * radius,
              1 + height,
              Math.sin(angle) * radius
            ]}
            rotation={[Math.random() * 0.5, angle, Math.random() * 0.3]}
          >
            <sphereGeometry args={[0.15 + Math.random() * 0.1, 8, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#228B22' : '#32CD32'}
              roughness={0.9}
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
      <mesh position={[0, 7.5, 0]}>
        <cylinderGeometry args={[1.8, 2.2, 15, 32]} />
        <meshStandardMaterial
          color="#F5DEB3"
          roughness={0.75}
          metalness={0.08}
        />
      </mesh>

      {/* 柱头 */}
      <mesh position={[0, 14.8, 0]}>
        <cylinderGeometry args={[2.4, 2.2, 0.8, 32]} />
        <meshStandardMaterial
          color="#DEB887"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* 柱基 */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[2.4, 2.2, 0.8, 32]} />
        <meshStandardMaterial
          color="#DEB887"
          roughness={0.7}
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
      <mesh position={[0, 7.5, 0]}>
        <boxGeometry args={[5.5, 10.5, 0.2]} />
        <meshStandardMaterial
          color="#5C4033"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* 玻璃 */}
      <mesh position={[0, 7.5, 0.1]}>
        <boxGeometry args={[4.8, 9.8, 0.05]} />
        <meshStandardMaterial
          color="#87CEEB"
          transparent
          opacity={0.6}
          roughness={0.15}
          metalness={0.05}
        />
      </mesh>

      {/* 窗格 */}
      {/* 中竖框 */}
      <mesh position={[0, 7.5, 0.15]}>
        <boxGeometry args={[0.15, 10.2, 0.08]} />
        <meshStandardMaterial
          color="#3D2817"
          roughness={0.75}
          metalness={0.05}
        />
      </mesh>
      {/* 中横框 */}
      <mesh position={[0, 5, 0.15]}>
        <boxGeometry args={[4.8, 0.15, 0.08]} />
        <meshStandardMaterial
          color="#3D2817"
          roughness={0.75}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0, 10, 0.15]}>
        <boxGeometry args={[4.8, 0.15, 0.08]} />
        <meshStandardMaterial
          color="#3D2817"
          roughness={0.75}
          metalness={0.05}
        />
      </mesh>

      {/* 窗外光线 */}
      <pointLight
        position={[0, 7.5, 0.3]}
        intensity={0.8}
        color="#87CEEB"
        distance={15}
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
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.4, 16]} />
        <meshStandardMaterial
          color="#C9A227"
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>
      {/* 瓶身 */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#FF69B4"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>
      {/* 瓶口 */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.08, 0.15, 0.2, 16]} />
        <meshStandardMaterial
          color="#C9A227"
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

// 图书管理员
function Librarian({ position }: { position: [number, number, number] }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogue] = useState([
    "欢迎来到图书馆！",
    "这里有许多知识等待你探索。",
    "需要帮助找到什么书吗？",
    "祝你在知识的海洋中畅游！"
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
      >
        <cylinderGeometry args={[0.5, 0.5, 1, 16]} />
        <meshStandardMaterial
          color="#F4A460"
          roughness={0.82}
          metalness={0.05}
        />
      </mesh>

      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#F4A460"
          roughness={0.82}
          metalness={0.05}
        />
      </mesh>

      <mesh position={[0, 2.5, 0.2]}>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial
          color="#4682B4"
          roughness={0.75}
          metalness={0.08}
        />
      </mesh>

      <Text
        position={[0, 0.5, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        点击对话
      </Text>

      {isDialogOpen && (
        <group position={[0, 3.5, 0]}>
          <mesh position={[0, 0, -0.1]}>
            <boxGeometry args={[3.2, 1.6, 0.1]} />
            <meshStandardMaterial
              color="#2c1a1d"
              roughness={0.92}
              metalness={0.05}
            />
          </mesh>
          <Text
            position={[0, 0, 0]}
            fontSize={0.42}
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
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.2, 0.12, 1.1]} />
        <meshStandardMaterial
          color="#8B6914"
          roughness={0.78}
          metalness={0.05}
        />
      </mesh>

      {[[-0.9, 0.45], [0.9, 0.45], [-0.9, -0.45], [0.9, -0.45]].map(([x, z], i) => (
        <mesh key={`leg-${i}`} position={[x, 0.4, z]}>
          <cylinderGeometry args={[0.08, 0.1, 0.8, 8]} />
          <meshStandardMaterial
            color="#5C4033"
            roughness={0.78}
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
      {/* 环境光 */}
      <ambientLight intensity={1.2} color="#F5DEB3" />

      {/* 主方向光 */}
      <directionalLight
        position={[45, 55, 45]}
        intensity={3}
        color="#FFF8DC"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* 补充点光源 */}
      <pointLight position={[0, 12, 0]} intensity={2.5} color="#FFF8DC" distance={45} />
      <pointLight position={[40, 10, 40]} intensity={2} color="#F5DEB3" distance={40} />
      <pointLight position={[-40, 10, -40]} intensity={2} color="#F5DEB3" distance={40} />

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
      {[[-35, -39], [35, -39], [-35, 39], [35, 39], [0, -39], [0, 39], [-39, 0], [39, 0]].map(([x, z], i) => (
        <Chair key={`chair-${i}`} position={[x, 0, z]} />
      ))}

      {/* 植物 */}
      {[[-45, 0], [45, 0], [0, -45], [0, 45], [-25, -25], [25, -25], [-25, 25], [25, 25], [-15, -15], [15, -15], [-15, 15], [15, 15]].map(([x, z], i) => (
        <Plant key={`plant-${i}`} position={[x, 0, z]} />
      ))}

      {/* 柱子 */}
      {[[-35, 0], [35, 0], [0, -35], [0, 35], [-20, -20], [20, -20], [-20, 20], [20, 20], [-10, -10], [10, -10], [-10, 10], [10, 10]].map(([x, z], i) => (
        <Column key={`column-${i}`} position={[x, 0, z]} />
      ))}

      {/* 窗户 */}
      {[[-45, -55], [-30, -55], [-15, -55], [0, -55], [15, -55], [30, -55], [45, -55],
        [-45, 55], [-30, 55], [-15, 55], [0, 55], [15, 55], [30, 55], [45, 55]].map(([x, z], i) => (
        <Window key={`window-${i}`} position={[x, 0, z > 0 ? 59.9 : -59.9]} />
      ))}

      {/* 装饰物品 */}
      {[[-15, -15], [15, -15], [-15, 15], [15, 15]].map(([x, z], i) => (
        <DecorativeItem key={`decor-${i}`} position={[x, 0, z]} />
      ))}

      {/* 桌子 */}
      {[[-6, -6], [6, -6], [-6, 6], [6, 6]].map(([x, z], i) => (
        <Table key={`table-${i}`} position={[x, 0, z]} />
      ))}

      {/* 特殊书架 */}
      {[[-20, 0], [20, 0]].map(([x, z], i) => (
        <SpecialBookshelf key={`special-shelf-${i}`} position={[x, 0, z]} />
      ))}

      {/* 图书管理员 */}
      <Librarian position={[0, 0, 0]} />

      {/* 光效 */}
      <Sparkles count={250} scale={120} size={2.5} speed={1.2} opacity={0.6} color="#FFF8DC" />

      {/* 标题 */}
      <Text
        position={[0, 12.5, 0]}
        fontSize={4.5}
        color="#C9A227"
        anchorX="center"
        anchorY="middle"
      >
        智慧图书馆
      </Text>
    </>
  );
}
