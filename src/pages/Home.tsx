import { useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTutorialStore } from '../store/tutorialStore';
import TutorialContent from '../components/TutorialContent';
import Hotspot from '../components/Hotspot';
import LibraryScene from '../components/LibraryScene';
import Minimap from '../components/Minimap';
import DragControls from '../components/DragControls';

function PositionTracker() {
  const { camera } = useThree();
  const { setUserPosition, setUserRotation, checkTutorialTrigger } = useTutorialStore();
  
  useFrame(() => {
    setUserPosition({ x: camera.position.x, y: camera.position.y, z: camera.position.z });
    setUserRotation({ x: camera.rotation.x, y: camera.rotation.y, z: camera.rotation.z });
    checkTutorialTrigger();
  });
  
  return null;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);
  
  return (
    <div className="w-full h-screen bg-[#1a1408]">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1a1408] z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#d4af37] font-serif text-lg">Loading...</p>
          </div>
        </div>
      )}
      
      <Canvas 
        camera={{ position: [0, 1.6, 8], fov: 60 }} 
        onCreated={() => setIsLoading(false)}
      >
        <LibraryScene />
        <DragControls 
          lookSpeed={0.015} 
          movementSpeed={1.0}
        />
        <PositionTracker />
        {useTutorialStore.getState().tutorials.map((tutorial) => (
          <Hotspot 
            key={tutorial.id} 
            position={tutorial.position} 
            radius={tutorial.radius} 
            tutorialId={tutorial.id} 
          />
        ))}
      </Canvas>
      
      <Minimap />
      <TutorialContent />
      
      <div className="fixed top-4 left-4 bg-black/70 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-[#d4af37]/30">
        <h3 className="text-sm font-medium text-[#d4af37] mb-2 font-serif">控制说明</h3>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>WASD/箭头键 - 移动</li>
          <li>按住鼠标左键拖动 - 控制视角</li>
          <li>走到金色圆环处 - 触发教程</li>
          <li>按空格键 - 跳过当前教程</li>
        </ul>
      </div>
    </div>
  );
}
