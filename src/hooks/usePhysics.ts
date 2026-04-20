// 物理引擎钩子
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { initPhysics, updatePhysics, cleanupPhysics, getPhysicsWorld } from '../utils/physics';

// 物理引擎钩子
export function usePhysics() {
  const lastTimeRef = useRef(0);
  
  // 初始化物理引擎
  useEffect(() => {
    initPhysics();
    
    // 清理函数
    return () => {
      cleanupPhysics();
    };
  }, []);
  
  // 每帧更新物理世界
  useFrame(({ clock }) => {
    const currentTime = clock.getElapsedTime();
    const delta = lastTimeRef.current ? currentTime - lastTimeRef.current : 1/60;
    lastTimeRef.current = currentTime;
    
    updatePhysics(delta);
  });
  
  // 返回物理世界实例
  return getPhysicsWorld();
}
