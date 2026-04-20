import { useEffect } from 'react';
import { useUserStore, useTutorialStore } from '../store';
import { useAudio } from '../utils/audio';

export default function TutorialContent() {
  const { tutorials } = useTutorialStore();
  const { userState, completeTutorial } = useUserStore();
  const { playSound } = useAudio();
  const { currentTutorial, completedTutorials } = userState;
  
  // 找到当前教程
  const tutorial = tutorials.find(t => t.id === currentTutorial);
  
  // 计算当前进度
  const progress = Math.round((completedTutorials.length / tutorials.length) * 100);
  
  // 添加空格键跳过教程功能
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && currentTutorial) {
        e.preventDefault();
        playSound('ui', 0.7);
        completeTutorial(currentTutorial);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentTutorial, completeTutorial, playSound]);
  
  if (!tutorial) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* 教程卡片 */}
      <div className="relative bg-gradient-to-b from-amber-50 to-amber-100 rounded-xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden pointer-events-auto border-2 border-amber-300">
        {/* 顶部装饰条 */}
        <div className="h-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600"></div>
        
        {/* 进度条 */}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-amber-800 font-medium">
              学习进度
            </span>
            <span className="text-sm font-bold text-amber-700">
              {completedTutorials.length}/{tutorials.length}
            </span>
          </div>
          <div className="w-full bg-amber-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-amber-500 to-yellow-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* 内容区域 */}
        <div className="p-6">
          <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2 flex items-center gap-2">
            <span className="text-3xl">📖</span>
            {tutorial.title}
          </h2>
          <div className="text-gray-700 whitespace-pre-line leading-relaxed mb-6 bg-white/60 p-4 rounded-lg">
            {tutorial.content}
          </div>
          
          {tutorial.type === 'image' && tutorial.mediaUrl && (
            <div className="mb-4 rounded-lg overflow-hidden shadow-md">
              <img src={tutorial.mediaUrl} alt={tutorial.title} className="w-full h-auto" />
            </div>
          )}
          
          {tutorial.type === 'video' && tutorial.mediaUrl && (
            <div className="mb-4 rounded-lg overflow-hidden shadow-md">
              <video src={tutorial.mediaUrl} controls className="w-full h-auto" />
            </div>
          )}
          
          {/* 操作按钮 */}
          <button 
            onClick={() => {
              playSound('ui', 0.7);
              completeTutorial(tutorial.id);
            }}
            className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white py-3 px-6 rounded-lg shadow-lg transition-all duration-300 font-medium text-lg flex items-center justify-center gap-2"
          >
            <span>✓</span>
            我知道了
            <span className="text-sm bg-white/20 px-2 py-0.5 rounded">
              或按空格键
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
