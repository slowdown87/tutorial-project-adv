import { Text, Sparkles } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import * as CANNON from 'cannon-es';

// 导入场景组件
import Floor from './scene/Floor';
import Ceiling from './scene/Ceiling';
import Walls from './scene/Walls';
import Bookshelf from './scene/Bookshelf';
import { ReadingDesk, Chair } from './scene/Furniture';
import Plant from './scene/Plant';
import Librarian from './scene/Librarian';

// 导入物理引擎工具
import { createCollisionBody, getPhysicsWorld } from '../utils/physics';

export default function LibraryScene() {
  // 初始化物理碰撞体
  useEffect(() => {
    const world = getPhysicsWorld();
    
    // 创建地面碰撞体
    const floorShape = new CANNON.Plane();
    const floorBody = createCollisionBody(floorShape, new CANNON.Vec3(0, 0, 0));
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    
    // 创建墙壁碰撞体
    // 前墙
    const frontWallShape = new CANNON.Plane();
    const frontWallBody = createCollisionBody(frontWallShape, new CANNON.Vec3(0, 0, 40));
    frontWallBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI);
    
    // 后墙
    const backWallShape = new CANNON.Plane();
    const backWallBody = createCollisionBody(backWallShape, new CANNON.Vec3(0, 0, -40));
    
    // 左墙
    const leftWallShape = new CANNON.Plane();
    const leftWallBody = createCollisionBody(leftWallShape, new CANNON.Vec3(-40, 0, 0));
    leftWallBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
    
    // 右墙
    const rightWallShape = new CANNON.Plane();
    const rightWallBody = createCollisionBody(rightWallShape, new CANNON.Vec3(40, 0, 0));
    rightWallBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2);
    
    // 创建书架碰撞体
    const bookshelfPositions = [
      [-35, -30], [-35, 0], [-35, 30],
      [35, -30], [35, 0], [35, 30],
      [-30, -35], [0, -35], [30, -35],
      [-30, 35], [0, 35], [30, 35]
    ];
    
    bookshelfPositions.forEach(([x, z]) => {
      const bookshelfShape = new CANNON.Box(new CANNON.Vec3(2, 2, 0.5));
      createCollisionBody(bookshelfShape, new CANNON.Vec3(x, 2, z));
    });
    
    // 创建阅读桌碰撞体
    const deskPositions = [[-15, -15], [15, -15], [-15, 15], [15, 15]];
    deskPositions.forEach(([x, z]) => {
      const deskShape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 1));
      createCollisionBody(deskShape, new CANNON.Vec3(x, 0.5, z));
      
      // 创建椅子碰撞体
      const chairShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
      createCollisionBody(chairShape, new CANNON.Vec3(x, 0.5, z + 1.5));
    });
    
    // 清理函数
    return () => {
      // 移除所有碰撞体
      const bodies = [...world.bodies];
      bodies.forEach(body => world.removeBody(body));
    };
  }, []);
  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.3} color="#f0e0d0" />

      {/* 主方向光 - 模拟阳光 */}
      <directionalLight
        position={[30, 40, 30]}
        intensity={1.5}
        color="#fffde8"
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
      />

      {/* 辅助方向光 - 模拟室内灯光 */}
      <directionalLight
        position={[-20, 30, -20]}
        intensity={0.8}
        color="#f0e6d2"
      />

      {/* 点光源 - 模拟吊灯 */}
      <pointLight
        position={[0, 8, 0]}
        intensity={1.2}
        color="#ffd700"
        distance={50}
        decay={2}
      />

      {/* 点光源 - 模拟壁灯 */}
      {[[-35, 6, -35], [35, 6, -35], [-35, 6, 35], [35, 6, 35]].map(([x, y, z], i) => (
        <pointLight
          key={`wall-light-${i}`}
          position={[x, y, z]}
          intensity={0.6}
          color="#f0e6d2"
          distance={30}
          decay={2}
        />
      ))}

      {/* 聚光灯 - 模拟阅读灯 */}
      {[[-15, 4, -15], [15, 4, -15], [-15, 4, 15], [15, 4, 15]].map(([x, y, z], i) => (
        <spotLight
          key={`reading-light-${i}`}
          position={[x, y, z]}
          intensity={0.8}
          color="#ffffff"
          angle={Math.PI / 6}
          penumbra={0.2}
          decay={2}
          distance={20}
        />
      ))}

      {/* 雾效 */}
      <fog color="#1a1408" near={50} far={100} />

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
