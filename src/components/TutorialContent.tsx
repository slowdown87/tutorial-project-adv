import { useTutorialStore } from '../store/tutorialStore';

export default function TutorialContent() {
  const { tutorials, userState, completeTutorial } = useTutorialStore();
  const { currentTutorial } = userState;
  
  // 找到当前教程
  const tutorial = tutorials.find(t => t.id === currentTutorial);
  
  if (!tutorial) return null;
  
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-md w-full border border-[#8B4513]/30">
      <h2 className="text-xl font-serif font-bold text-[#8B4513] mb-3">{tutorial.title}</h2>
      <p className="text-gray-700 mb-4">{tutorial.content}</p>
      {tutorial.type === 'image' && tutorial.mediaUrl && (
        <div className="mb-4 rounded-md overflow-hidden">
          <img src={tutorial.mediaUrl} alt={tutorial.title} className="w-full h-auto" />
        </div>
      )}
      {tutorial.type === 'video' && tutorial.mediaUrl && (
        <div className="mb-4 rounded-md overflow-hidden">
          <video src={tutorial.mediaUrl} controls className="w-full h-auto" />
        </div>
      )}
      <button 
        onClick={() => completeTutorial(tutorial.id)}
        className="w-full bg-[#8B4513] text-white py-2 px-4 rounded-md hover:bg-[#A0522D] transition-colors font-medium"
      >
        我知道了
      </button>
    </div>
  );
}
