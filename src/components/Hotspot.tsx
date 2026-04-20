import { useThree } from '@react-three/fiber';
import { useTutorialStore } from '../store/tutorialStore';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HotspotProps {
  position: { x: number; y: number; z: number };
  radius: number;
  tutorialId: string;
}

export default function Hotspot({ position, radius, tutorialId }: HotspotProps) {
  const { camera } = useThree();
  const { userState, tutorials } = useTutorialStore();
  const meshRef = useRef<THREE.Mesh>(null);
  
  // 检查教程是否已完成
  const isCompleted = userState.completedTutorials.includes(tutorialId);
  
  // 计算用户与热点的距离
  const distance = Math.sqrt(
    Math.pow(userState.position.x - position.x, 2) +
    Math.pow(userState.position.z - position.z, 2)
  );
  
  // 计算热点的缩放和透明度
  const scale = distance < radius * 2 ? 1 + (radius * 2 - distance) / 10 : 1;
  const opacity = distance < radius * 3 ? 1 - (distance / (radius * 3)) : 0;
  
  useEffect(() => {
    if (meshRef.current) {
      // 添加脉冲动画
      meshRef.current.scale.set(scale, scale, scale);
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  }, [scale, opacity]);
  
  if (isCompleted) return null;
  
  return (
    <mesh 
      ref={meshRef}
      position={[position.x, position.y, position.z]}
    >
      <torusGeometry args={[0.3, 0.1, 16, 32]} />
      <meshBasicMaterial 
        color="#DAA520" 
        transparent 
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
