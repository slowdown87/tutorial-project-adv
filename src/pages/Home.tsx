import { useState, useEffect, Suspense, lazy } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useUserStore, useTutorialStore } from '../store';
import TutorialContent from '../components/TutorialContent';
import Hotspot from '../components/Hotspot';
import DragControls from '../components/DragControls';
import { useAudio } from '../utils/audio';
import { usePhysics } from '../hooks/usePhysics';

// 动态导入大型组件
const LibraryScene = lazy(() => import('../components/LibraryScene'));
const Minimap = lazy(() => import('../components/Minimap'));
const TaskUI = lazy(() => import('../components/TaskUI'));

function PhysicsManager() {
  usePhysics();
  return null;
}

function PositionTracker() {
  const { camera } = useThree();
  const { setUserPosition, setUserRotation } = useUserStore();
  const { checkTutorialTrigger } = useTutorialStore();
  
  useFrame(() => {
    setUserPosition({ x: camera.position.x, y: camera.position.y, z: camera.position.z });
    setUserRotation({ x: camera.rotation.x, y: camera.rotation.y, z: camera.rotation.z });
    checkTutorialTrigger();
  });
  
  return null;
}

// WebGL 兼容性检测组件
const WebGLCompatibility = ({ children }) => {
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // 检测 WebGL 支持
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
      } catch {
        return false;
      }
    };

    setIsWebGLAvailable(checkWebGL());

    // 监听渲染错误
    const handleError = (event) => {
      if (event?.message?.includes('WebGL')) {
        setHasError(true);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (!isWebGLAvailable || hasError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1a1408] text-white p-8">
        <div className="max-w-md w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-[#d4af37]">智慧图书馆</h1>
          <div className="bg-red-900/50 border border-red-600 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-3 text-red-200">⚠️ 浏览器不支持 WebGL</h2>
            <p className="text-gray-300 mb-4">
              很抱歉，您的浏览器无法支持 3D 渲染功能。
            </p>
            <div className="text-sm text-gray-400">
              <p className="mb-2">请尝试使用以下浏览器：</p>
              <ul className="flex flex-wrap justify-center gap-2">
                <li className="bg-gray-800 px-3 py-1 rounded">Chrome</li>
                <li className="bg-gray-800 px-3 py-1 rounded">Firefox</li>
                <li className="bg-gray-800 px-3 py-1 rounded">Edge</li>
                <li className="bg-gray-800 px-3 py-1 rounded">Safari</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4 text-left">
            <h3 className="font-bold text-[#d4af37]">项目介绍</h3>
            <p className="text-gray-300">
              智慧图书馆是一个沉浸式 3D 学习环境，包含以下功能：
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>3D 图书馆场景自由探索</li>
              <li>交互式教程学习系统</li>
              <li>智能 NPC 对话助手</li>
              <li>实时小地图导航</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { userState } = useUserStore();
  const { tutorials } = useTutorialStore();
  const { playSound } = useAudio();
  
  // 计算进度
  const progress = Math.round((userState.completedTutorials.length / tutorials.length) * 100);
  
  // 监听教程完成事件，播放音效
  useEffect(() => {
    if (userState.completedTutorials.length > 0) {
      playSound('ui', 0.7);
    }
  }, [userState.completedTutorials.length, playSound]);
  
  return (
    <WebGLCompatibility>
      <div className="w-full h-screen bg-[#1a1408]">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1a1408] z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#d4af37] font-serif text-lg">正在加载智慧图书馆...</p>
          </div>
        </div>
      )}
      
      <Canvas 
        camera={{ position: [0, 1.6, 10], fov: 60 }} 
        onCreated={() => setIsLoading(false)}
      >
        <Suspense fallback={null}>
          <LibraryScene />
        </Suspense>
        <PhysicsManager />
        <DragControls 
          lookSpeed={0.002} 
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
      
      <Suspense fallback={null}>
        <Minimap />
        <TaskUI />
      </Suspense>
      <TutorialContent />
      
      {/* 控制说明面板 */}
      <div className="fixed top-4 left-4 bg-black/70 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-[#d4af37]/40 max-w-xs">
        <h3 className="text-sm font-bold text-[#d4af37] mb-3 font-serif flex items-center gap-2">
          <span>🎮</span>
          操作指南
        </h3>
        <ul className="text-xs text-gray-200 space-y-2">
          <li className="flex items-center gap-2">
            <span className="bg-amber-600/80 px-2 py-0.5 rounded text-white font-bold">WASD</span>
            <span>或方向键移动</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-amber-600/80 px-2 py-0.5 rounded text-white font-bold">🖱️</span>
            <span>按住左键拖动视角</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-amber-600/80 px-2 py-0.5 rounded text-white font-bold">⭐</span>
            <span>金色圆环=学习点</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-amber-600/80 px-2 py-0.5 rounded text-white font-bold">Space</span>
            <span>跳过/完成教程</span>
          </li>
        </ul>
        
        {/* 进度显示 */}
        <div className="mt-4 pt-3 border-t border-[#d4af37]/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#d4af37] font-medium">总体进度</span>
            <span className="text-xs font-bold text-white">{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div 
              className="bg-gradient-to-r from-[#d4af37] to-yellow-400 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            已完成 {userState.completedTutorials.length}/{tutorials.length}
          </p>
        </div>
      </div>
    </div>
    </WebGLCompatibility>
  );
}
