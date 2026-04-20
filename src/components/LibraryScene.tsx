import { Text, Sparkles, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { useState } from 'react';

function Floor() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial 
          color="#d2b48c" 
          roughness={0.8} 
          metalness={0.1}
        />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial 
          color="#8b0000" 
          roughness={0.9} 
          metalness={0.1}
        />
      </mesh>
      
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={`rug-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[-30 + i * 20, 0.02, -30 + i * 20]}>
          <planeGeometry args={[15, 15]} />
          <meshStandardMaterial 
            color="#2f4f2f" 
            roughness={0.9} 
            metalness={0.05}
          />
        </mesh>
      ))}
      
      {[[-15, -15], [15, -15], [-15, 15], [15, 15]].map(([x, z], i) => (
        <mesh key={`small-rug-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.03, z]}>
          <planeGeometry args={[8, 8]} />
          <meshStandardMaterial 
            color="#8b4513" 
            roughness={0.85} 
            metalness={0.05}
          />
        </mesh>
      ))}
      
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 40;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh key={`floor-decor-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.02, z]}>
            <circleGeometry args={[1, 16]} />
            <meshStandardMaterial 
              color="#d4af37" 
              roughness={0.7} 
              metalness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Ceiling() {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 15, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial 
          color="#f5deb3" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
      
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 40;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <group key={`chandelier-${i}`} position={[x, 14, z]}>
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 2, 16]} />
              <meshStandardMaterial 
                color="#d4af37" 
                metalness={0.8} 
                roughness={0.2}
              />
            </mesh>
            
            <mesh position={[0, -1, 0]}>
              <cylinderGeometry args={[1.8, 2.2, 1, 32]} />
              <meshStandardMaterial 
                color="#fff8e7" 
                emissive="#fff8e7" 
                emissiveIntensity={0.9}
              />
            </mesh>
            
            <pointLight 
              position={[0, -2, 0]} 
              intensity={3} 
              color="#fff8e7" 
              distance={30} 
              decay={2} 
            />
          </group>
        );
      })
      }
      
      {[[-30, 30], [30, 30], [-30, -30], [30, -30], [0, 0], [0, 30], [0, -30], [30, 0], [-30, 0]].map(([x, z], i) => (
        <group key={`central-chandelier-${i}`} position={[x, 14, z]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 2.5, 16]} />
            <meshStandardMaterial 
              color="#d4af37" 
              metalness={0.8} 
              roughness={0.2}
            />
          </mesh>
          
          <mesh position={[0, -1.2, 0]}>
            <cylinderGeometry args={[2.5, 3, 1.2, 32]} />
            <meshStandardMaterial 
              color="#fff8e7" 
              emissive="#fff8e7" 
              emissiveIntensity={1.2}
            />
          </mesh>
          
          <pointLight 
            position={[0, -2.5, 0]} 
            intensity={4} 
            color="#fff8e7" 
            distance={35} 
            decay={2} 
          />
        </group>
      ))}
    </group>
  );
}

function Walls() {
  return (
    <group>
      <mesh position={[0, 7.5, -60]}>
        <boxGeometry args={[120, 15, 0.5]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.85} 
          metalness={0.1}
        />
      </mesh>
      
      <mesh position={[-60, 7.5, 0]}>
        <boxGeometry args={[0.5, 15, 120]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.85} 
          metalness={0.1}
        />
      </mesh>
      
      <mesh position={[60, 7.5, 0]}>
        <boxGeometry args={[0.5, 15, 120]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.85} 
          metalness={0.1}
        />
      </mesh>
      
      <mesh position={[0, 7.5, 60]}>
        <boxGeometry args={[120, 15, 0.5]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.85} 
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

function Bookshelf({ position, side = 'left' }: { position: [number, number, number]; side?: 'left' | 'right' }) {
  const bookColors = [
    '#8b0000', '#006400', '#00008b', '#8b4513', '#4b0082', 
    '#800000', '#2f4f4f', '#556b2f', '#ff6347', '#4682b4',
    '#daa520', '#9370db', '#32cd32', '#ff4500', '#1e90ff',
    '#ff69b4', '#87ceeb', '#98fb98', '#ffd700', '#dda0dd'
  ];
  
  return (
    <group position={position}>
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[6, 8, 0.6]} />
        <meshStandardMaterial 
          color="#5c4033" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
      
      {[1, 2, 3, 4, 5, 6, 7].map((y) => (
        <mesh key={`shelf-${y}`} position={[0, y, 0]}>
          <boxGeometry args={[6.1, 0.1, 0.7]} />
          <meshStandardMaterial 
            color="#4a3020" 
            roughness={0.6} 
            metalness={0.1}
          />
        </mesh>
      ))}
      
      <mesh position={[-3, 4, 0]}>
        <boxGeometry args={[0.2, 8.1, 0.7]} />
        <meshStandardMaterial 
          color="#3d2817" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
      <mesh position={[3, 4, 0]}>
        <boxGeometry args={[0.2, 8.1, 0.7]} />
        <meshStandardMaterial 
          color="#3d2817" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
      
      {[1.5, 2.5, 3.5, 4.5, 5.5, 6.5].map((y, shelfIndex) => (
        <group key={`books-${shelfIndex}`}>
          {Array.from({ length: 24 }).map((_, bookIndex) => {
            const height = 0.9 + Math.random() * 0.5;
            const width = 0.2 + Math.random() * 0.15;
            const depth = 0.55;
            const color = bookColors[Math.floor(Math.random() * bookColors.length)];
            const xPos = -2.8 + bookIndex * 0.24;
            const rotation = (Math.random() - 0.5) * 0.15;
            
            return (
              <mesh 
                key={`book-${shelfIndex}-${bookIndex}`} 
                position={[xPos, y, 0.28 + (side === 'right' ? -0.1 : 0.1)]}
                rotation={[0, 0, rotation]}
              >
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial 
                  color={color} 
                  roughness={0.7} 
                  metalness={0.1}
                />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

function SpecialBookshelf({ position }: { position: [number, number, number] }) {
  const bookColors = [
    '#d4af37', '#ffd700', '#f0e68c', '#fffacd', '#fafad2',
    '#ffffe0', '#f5deb3', '#fdf5e6', '#fffaf0', '#f5f5dc'
  ];
  
  return (
    <group position={position}>
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[4, 8, 0.8]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.6} 
          metalness={0.2}
        />
      </mesh>
      
      {[1, 2, 3, 4, 5, 6, 7].map((y) => (
        <mesh key={`special-shelf-${y}`} position={[0, y, 0]}>
          <boxGeometry args={[4.1, 0.1, 0.9]} />
          <meshStandardMaterial 
            color="#654321" 
            roughness={0.5} 
            metalness={0.2}
          />
        </mesh>
      ))}
      
      <mesh position={[-2, 4, 0]}>
        <boxGeometry args={[0.2, 8.1, 0.9]} />
        <meshStandardMaterial 
          color="#556b2f" 
          roughness={0.6} 
          metalness={0.2}
        />
      </mesh>
      <mesh position={[2, 4, 0]}>
        <boxGeometry args={[0.2, 8.1, 0.9]} />
        <meshStandardMaterial 
          color="#556b2f" 
          roughness={0.6} 
          metalness={0.2}
        />
      </mesh>
      
      {[1.5, 2.5, 3.5, 4.5, 5.5, 6.5].map((y, shelfIndex) => (
        <group key={`special-books-${shelfIndex}`}>
          {Array.from({ length: 16 }).map((_, bookIndex) => {
            const height = 0.9 + Math.random() * 0.5;
            const width = 0.2 + Math.random() * 0.15;
            const depth = 0.75;
            const color = bookColors[Math.floor(Math.random() * bookColors.length)];
            const xPos = -1.8 + bookIndex * 0.24;
            const rotation = (Math.random() - 0.5) * 0.1;
            
            return (
              <mesh 
                key={`special-book-${shelfIndex}-${bookIndex}`} 
                position={[xPos, y, 0.35]}
                rotation={[0, 0, rotation]}
              >
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial 
                  color={color} 
                  roughness={0.7} 
                  metalness={0.3}
                />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

function ReadingDesk({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[3.5, 0.15, 1.8]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
      
      {[[-1.4, 0], [1.4, 0]].map(([x, z], i) => (
        <mesh key={`leg-${i}`} position={[x, 0.6, z]}>
          <boxGeometry args={[0.2, 1.2, 1.5]} />
          <meshStandardMaterial 
            color="#8b4513" 
            roughness={0.7} 
            metalness={0.1}
          />
        </mesh>
      ))}
      
      <mesh position={[0, 0.4, 0.75]}>
        <boxGeometry args={[3, 0.8, 0.1]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
      
      <mesh position={[0, 1.3, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.2, 0.5, 0.4]} />
        <meshStandardMaterial 
          color="#4682b4" 
          roughness={0.7} 
          metalness={0.2}
        />
      </mesh>
      
      <mesh position={[0.8, 1.3, 0.3]} rotation={[0, Math.PI / 3, 0]}>
        <boxGeometry args={[0.15, 0.4, 0.25]} />
        <meshStandardMaterial 
          color="#ff6347" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

function Chair({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.8, 0.15, 0.8]} />
        <meshStandardMaterial 
          color="#a0522d" 
          roughness={0.6} 
          metalness={0.1}
        />
      </mesh>
      
      {[[-0.3, 0.3], [0.3, 0.3], [-0.3, -0.3], [0.3, -0.3]].map(([x, z], i) => (
        <mesh key={`leg-${i}`} position={[x, 0.35, z]}>
          <cylinderGeometry args={[0.1, 0.1, 0.7, 8]} />
          <meshStandardMaterial 
            color="#8b4513" 
            roughness={0.7} 
            metalness={0.1}
          />
        </mesh>
      ))}
      
      <mesh position={[0, 1.4, -0.3]}>
        <boxGeometry args={[0.8, 1.2, 0.15]} />
        <meshStandardMaterial 
          color="#a0522d" 
          roughness={0.6} 
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1.5, 16]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.8} 
          metalness={0.1}
        />
      </mesh>
      
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <mesh 
          key={`leaf-${i}`} 
          position={[
            Math.sin(i * Math.PI * 0.2) * 0.6, 
            1.8 + Math.sin(i) * 0.5, 
            Math.cos(i * Math.PI * 0.2) * 0.6
          ]}
          rotation={[0, i * 0.3, 0]}
        >
          <sphereGeometry args={[0.35, 12, 12]} />
          <meshStandardMaterial 
            color="#228b22" 
            roughness={0.8} 
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function Column({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 7.5, 0]}>
        <cylinderGeometry args={[2, 2, 15, 32]} />
        <meshStandardMaterial 
          color="#f5deb3" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

function Window({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 7.5, 0]}>
        <boxGeometry args={[5, 10, 0.1]} />
        <meshStandardMaterial 
          color="#add8e6" 
          roughness={0.3} 
          metalness={0.1}
        />
      </mesh>
      
      <mesh position={[0, 7.5, 0.05]}>
        <boxGeometry args={[0.1, 10, 0.2]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
      
      <mesh position={[2.5, 7.5, 0.05]}>
        <boxGeometry args={[0.1, 10, 0.2]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
      
      <mesh position={[-2.5, 7.5, 0.05]}>
        <boxGeometry args={[0.1, 10, 0.2]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
      
      <mesh position={[0, 10, 0.05]}>
        <boxGeometry args={[5, 0.1, 0.2]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
      
      <mesh position={[0, 5, 0.05]}>
        <boxGeometry args={[5, 0.1, 0.2]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

function DecorativeItem({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color="#ff69b4" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

function Librarian({ position }: { position: [number, number, number] }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogue, setDialogue] = useState([
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
          color="#f4a460" 
          roughness={0.8} 
          metalness={0.1}
        />
      </mesh>
      
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color="#f4a460" 
          roughness={0.8} 
          metalness={0.1}
        />
      </mesh>
      
      <mesh position={[0, 2.5, 0.2]}>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial 
          color="#4682b4" 
          roughness={0.7} 
          metalness={0.1}
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
            <boxGeometry args={[3, 1.5, 0.1]} />
            <meshStandardMaterial 
              color="#2c1a1d" 
              roughness={0.9} 
              metalness={0.1}
            />
          </mesh>
          <Text
            position={[0, 0, 0]}
            fontSize={0.4}
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

function Table({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
      
      {[[-0.8, 0.4], [0.8, 0.4], [-0.8, -0.4], [0.8, -0.4]].map(([x, z], i) => (
        <mesh key={`leg-${i}`} position={[x, 0.4, z]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
          <meshStandardMaterial 
            color="#8b4513" 
            roughness={0.7} 
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function LibraryScene() {
  return (
    <>
      <ambientLight intensity={0.8} color="#f5deb3" />
      
      <directionalLight 
        position={[40, 50, 40]} 
        intensity={2.5} 
        color="#fff8e7" 
        castShadow
      />
      
      <pointLight position={[0, 12, 0]} intensity={2} color="#fff8e7" distance={40} />
      <pointLight position={[40, 10, 40]} intensity={1.5} color="#f5deb3" distance={35} />
      <pointLight position={[-40, 10, -40]} intensity={1.5} color="#f5deb3" distance={35} />
      
      <Floor />
      <Walls />
      <Ceiling />
      
      {[[-50, -40], [-50, -25], [-50, -10], [-50, 5], [-50, 20], [-50, 35], 
        [50, -40], [50, -25], [50, -10], [50, 5], [50, 20], [50, 35]].map(([x, z], i) => (
        <Bookshelf key={`shelf-${i}`} position={[x, 0, z]} side={x < 0 ? 'left' : 'right'} />
      ))}
      
      {[[-40, -50], [-25, -50], [-10, -50], [5, -50], [20, -50], [35, -50], 
        [-40, 50], [-25, 50], [-10, 50], [5, 50], [20, 50], [35, 50]].map(([x, z], i) => (
        <Bookshelf key={`back-shelf-${i}`} position={[x, 0, z]} side={z < 0 ? 'left' : 'right'} />
      ))}
      
      {[[-30, -30], [30, -30], [-30, 30], [30, 30], [0, -30], [0, 30], [-30, 0], [30, 0]].map(([x, z], i) => (
        <ReadingDesk key={`desk-${i}`} position={[x, 0, z]} />
      ))}
      
      {[[-30, -33], [30, -33], [-30, 33], [30, 33], [0, -33], [0, 33], [-33, 0], [33, 0]].map(([x, z], i) => (
        <Chair key={`chair-${i}`} position={[x, 0, z]} />
      ))}
      
      {[[-40, 0], [40, 0], [0, -40], [0, 40], [-25, -25], [25, -25], [-25, 25], [25, 25], [-15, -15], [15, -15], [-15, 15], [15, 15]].map(([x, z], i) => (
        <Plant key={`plant-${i}`} position={[x, 0, z]} />
      ))}
      
      {[[-35, 0], [35, 0], [0, -35], [0, 35], [-20, -20], [20, -20], [-20, 20], [20, 20], [-10, -10], [10, -10], [-10, 10], [10, 10]].map(([x, z], i) => (
        <Column key={`column-${i}`} position={[x, 0, z]} />
      ))}
      
      {[[-40, -50], [-25, -50], [-10, -50], [5, -50], [20, -50], [35, -50], 
        [-40, 50], [-25, 50], [-10, 50], [5, 50], [20, 50], [35, 50]].map(([x, z], i) => (
        <Window key={`window-${i}`} position={[x, 0, z > 0 ? 59.9 : -59.9]} />
      ))}
      
      {[[-15, -15], [15, -15], [-15, 15], [15, 15]].map(([x, z], i) => (
        <DecorativeItem key={`decor-${i}`} position={[x, 0, z]} />
      ))}
      
      {[[-5, -5], [5, -5], [-5, 5], [5, 5]].map(([x, z], i) => (
        <Table key={`table-${i}`} position={[x, 0, z]} />
      ))}
      
      {[[-20, 0], [20, 0]].map(([x, z], i) => (
        <SpecialBookshelf key={`special-shelf-${i}`} position={[x, 0, z]} />
      ))}
      
      {[[-10, -20], [10, -20], [-10, 20], [10, 20]].map(([x, z], i) => (
        <DecorativeItem key={`extra-decor-${i}`} position={[x, 0, z]} />
      ))}
      
      <Librarian position={[0, 0, 0]} />
      
      <Sparkles count={200} scale={120} size={2} speed={1} opacity={0.7} color="#fff8e7" />
      
      <Text
        position={[0, 12, 0]}
        fontSize={4}
        color="#d4af37"
        anchorX="center"
        anchorY="middle"
      >
        3D 图书馆
      </Text>
    </>
  );
}
