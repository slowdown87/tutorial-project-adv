import { Text, Sparkles } from '@react-three/drei';

// 导入场景组件
import Floor from './scene/Floor';
import Ceiling from './scene/Ceiling';
import Walls from './scene/Walls';
import Bookshelf from './scene/Bookshelf';
import { ReadingDesk, Chair } from './scene/Furniture';
import Plant from './scene/Plant';
import Librarian from './scene/Librarian';

export default function LibraryScene() {
  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.5} color="#f0e0d0" />

      {/* 主方向光 */}
      <directionalLight
        position={[30, 40, 30]}
        intensity={2}
        color="#fffde8"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      {/* 场景元素 */}
      <Floor />
      <Walls />
      <Ceiling />

      {/* 书架 */}
      {[[-35, -30], [-35, 0], [-35, 30], 
        [35, -30], [35, 0], [35, 30],
        [-30, -35], [0, -35], [30, -35],
        [-30, 35], [0, 35], [30, 35]].map(([x, z], i) => (
        <Bookshelf key={`shelf-${i}`} position={[x, 0, z]} side={x < 0 ? 'left' : 'right'} />
      ))}

      {/* 阅读桌和椅子 */}
      {[[-15, -15], [15, -15], [-15, 15], [15, 15]].map(([x, z], i) => (
        <group key={`desk-set-${i}`}>
          <ReadingDesk position={[x, 0, z]} />
          <Chair position={[x, 0, z + 1.5]} />
        </group>
      ))}

      {/* 植物 */}
      {[[-25, 0], [25, 0], [0, -25], [0, 25]].map(([x, z], i) => (
        <Plant key={`plant-${i}`} position={[x, 0, z]} seed={i + 1} />
      ))}

      {/* 图书管理员 */}
      <Librarian position={[0, 0, 0]} />

      {/* 光效粒子 */}
      <Sparkles count={100} scale={60} size={2} speed={1} opacity={0.4} color="#fffde8" />

      {/* 标题 */}
      <Text
        position={[0, 10, 0]}
        fontSize={3}
        color="#d4af37"
        anchorX="center"
        anchorY="middle"
      >
        智慧图书馆
      </Text>
    </>
  );
}
