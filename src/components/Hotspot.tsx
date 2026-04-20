import { useThree, useFrame } from '@react-three/fiber';
import { useTutorialStore } from '../store/tutorialStore';
import { useRef, useState } from 'react';
import * as THREE from 'three';

import React from 'react';

interface HotspotProps {
  position: { x: number; y: number; z: number };
  radius: number;
  tutorialId: string;
  key?: React.Key;
}

export default function Hotspot({ position, radius, tutorialId }: HotspotProps) {
  const { camera } = useThree();
  const { userState, tutorials } = useTutorialStore();
  const torusRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const [time, setTime] = useState(0);
  
  // 检查教程是否已完成
  const isCompleted = userState.completedTutorials.includes(tutorialId);
  
  // 计算用户与热点的距离
  const distance = Math.sqrt(
    Math.pow(userState.position.x - position.x, 2) +
    Math.pow(userState.position.z - position.z, 2)
  );
  
  // 是否在触发范围内
  const isInRange = distance < radius;
  
  useFrame((_, delta) => {
    setTime(t => t + delta);
    
    if (torusRef.current) {
      // 脉冲动画
      const pulseScale = 1 + Math.sin(time * 2) * 0.1;
      torusRef.current.scale.set(pulseScale, pulseScale, pulseScale);
      
      // 旋转动画
      torusRef.current.rotation.y = time * 0.5;
    }
    
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = -time * 0.8;
    }
  });
  
  if (isCompleted) return null;
  
  return (
    <group position={[position.x, position.y, position.z]}>
      {/* 外圆环 - 金色 */}
      <mesh ref={torusRef}>
        <torusGeometry args={[0.6, 0.12, 16, 64]} />
        <meshBasicMaterial 
          color={isInRange ? "#FFD700" : "#DAA520"} 
          transparent 
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* 内圆环 - 亮金色 */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[0.35, 0.08, 16, 64]} />
        <meshBasicMaterial 
          color={isInRange ? "#FFF8DC" : "#FFD700"} 
          transparent 
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* 底部发光效果 */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8, 64]} />
        <meshBasicMaterial 
          color="#DAA520" 
          transparent 
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
