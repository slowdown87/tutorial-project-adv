import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { FirstPersonControls, Box, Plane, Cylinder, SpotLight } from '@react-three/drei';
import { useTutorialStore } from '../store/tutorialStore';
import TutorialContent from '../components/TutorialContent';
import Hotspot from '../components/Hotspot';

// 位置跟踪组件
function PositionTracker() {
  const { camera } = useThree();
  const { setUserPosition, setUserRotation, checkTutorialTrigger } = useTutorialStore();
  
  useFrame(() => {
    // 更新用户位置
    setUserPosition({ x: camera.position.x, y: camera.position.y, z: camera.position.z });
    // 更新用户旋转
    setUserRotation({ x: camera.rotation.x, y: camera.rotation.y, z: camera.rotation.z });
    // 检查教程触发
    checkTutorialTrigger();
  });
  
  return null;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  // 模拟加载过程
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);
  
  return (
    <div className="w-full h-screen bg-[#F5F5DC]">
      {/* 加载动画 */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#F5F5DC] z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#8B4513] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#8B4513] font-serif text-lg">正在加载3D图书馆...</p>
          </div>
        </div>
      )}
      
      <Canvas 
        camera={{ position: [0, 1.6, 5], fov: 75 }} 
        onCreated={() => setIsLoading(false)}
      >
        {/* 环境光 */}
        <ambientLight intensity={0.6} color="#F5F5DC" />
        
        {/* 主光源 */}
        <directionalLight position={[5, 10, 5]} intensity={0.8} color="#FFD700" />
        
        {/* 辅助光源 */}
        <SpotLight position={[0, 5, 0]} intensity={0.4} color="#F5F5DC" angle={0.8} penumbra={0.2} />
        
        {/* 地板 */}
        <Plane 
          args={[50, 50]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, 0, 0]}
        >
          <meshStandardMaterial color="#D2B48C" roughness={0.8} />
        </Plane>
        
        {/* 墙壁 */}
        <Box args={[50, 4, 0.1]} position={[0, 2, -25]}>
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </Box>
        <Box args={[0.1, 4, 50]} position={[-25, 2, 0]}>
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </Box>
        <Box args={[0.1, 4, 50]} position={[25, 2, 0]}>
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </Box>
        
        {/* 天花板 */}
        <Plane 
          args={[50, 50]} 
          rotation={[Math.PI / 2, 0, 0]} 
          position={[0, 4, 0]}
        >
          <meshStandardMaterial color="#F5F5DC" roughness={0.8} />
        </Plane>
        
        {/* 书架 */}
        {Array.from({ length: 5 }).map((_, i) => (
          <>
            <Box 
              key={i} 
              args={[2, 2, 0.5]} 
              position={[-15, 1, -15 + i * 7]}
            >
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </Box>
            {/* 书籍 */}
            {Array.from({ length: 10 }).map((_, j) => (
              <Box 
                key={`left-${i}-${j}`} 
                args={[0.15, 0.6, 0.4]} 
                position={[-15.9 + j * 0.2, 1 + Math.sin(i * 0.5) * 0.1, -15 + i * 7]}
              >
                <meshStandardMaterial 
                  color={['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#D2B48C'][j % 5]} 
                  roughness={0.8} 
                />
              </Box>
            ))}
          </>
        ))}
        
        {Array.from({ length: 5 }).map((_, i) => (
          <>
            <Box 
              key={i} 
              args={[2, 2, 0.5]} 
              position={[15, 1, -15 + i * 7]}
            >
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </Box>
            {/* 书籍 */}
            {Array.from({ length: 10 }).map((_, j) => (
              <Box 
                key={`right-${i}-${j}`} 
                args={[0.15, 0.6, 0.4]} 
                position={[14.1 - j * 0.2, 1 + Math.cos(i * 0.5) * 0.1, -15 + i * 7]}
              >
                <meshStandardMaterial 
                  color={['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#D2B48C'][j % 5]} 
                  roughness={0.8} 
                />
              </Box>
            ))}
          </>
        ))}
        
        {/* 座椅 */}
        <Box args={[1, 0.5, 1.5]} position={[0, 0.25, -5]}>
          <meshStandardMaterial color="#A0522D" roughness={0.8} />
        </Box>
        <Cylinder 
          args={[0.3, 0.3, 0.5, 32]} 
          position={[0.4, 0.25, -5.5]}
        >
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </Cylinder>
        <Cylinder 
          args={[0.3, 0.3, 0.5, 32]} 
          position={[-0.4, 0.25, -5.5]}
        >
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </Cylinder>
        
        {/* 桌子 */}
        <Box args={[2, 0.1, 1]} position={[0, 0.1, -3]}>
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </Box>
        <Cylinder 
          args={[0.1, 0.1, 0.1, 32]} 
          position={[0.8, 0.05, -3]}
        >
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </Cylinder>
        <Cylinder 
          args={[0.1, 0.1, 0.1, 32]} 
          position={[-0.8, 0.05, -3]}
        >
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </Cylinder>
        
        {/* 植物 */}
        <Cylinder 
          args={[0.2, 0.2, 0.8, 32]} 
          position={[2, 0.4, -5]}
        >
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </Cylinder>
        <Box 
          args={[0.4, 0.6, 0.4]} 
          position={[2, 1, -5]}
        >
          <meshStandardMaterial color="#2F4F2F" roughness={0.8} />
        </Box>
        
        {/* 控制 */}
        <FirstPersonControls 
          lookSpeed={0.005} 
          movementSpeed={0.2}
        />
        
        {/* 位置跟踪 */}
        <PositionTracker />
        
        {/* 热点标记 */}
        {useTutorialStore.getState().tutorials.map((tutorial) => (
          <Hotspot 
            key={tutorial.id} 
            position={tutorial.position} 
            radius={tutorial.radius} 
            tutorialId={tutorial.id} 
          />
        ))}
      </Canvas>
      
      {/* 教程内容展示 */}
      <TutorialContent />
      
      {/* 控制提示 */}
      <div className="fixed top-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-md shadow-md border border-[#8B4513]/30">
        <h3 className="text-sm font-medium text-[#8B4513] mb-2">控制说明</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>WASD/箭头键 - 移动</li>
          <li>鼠标 - 控制视角</li>
          <li>走到金色圆环处学习教程</li>
        </ul>
      </div>
    </div>
  );
}