import { create } from 'zustand';

// 教程内容数据结构
export interface TutorialContent {
  id: string;
  title: string;
  content: string;
  position: { x: number; y: number; z: number };
  radius: number; // 触发半径
  type: 'text' | 'image' | 'video';
  mediaUrl?: string; // 图片或视频URL
}

// 用户状态数据结构
export interface UserState {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  completedTutorials: string[];
  currentTutorial: string | null;
}

// 状态管理store
export const useTutorialStore = create<{
  // 状态
  tutorials: TutorialContent[];
  userState: UserState;
  
  // 动作
  setUserPosition: (position: { x: number; y: number; z: number }) => void;
  setUserRotation: (rotation: { x: number; y: number; z: number }) => void;
  setCurrentTutorial: (tutorialId: string | null) => void;
  completeTutorial: (tutorialId: string) => void;
  checkTutorialTrigger: () => void;
}>((set, get) => ({
  // 初始状态
  tutorials: [
    {
      id: 'tutorial-1',
      title: '欢迎来到3D图书馆',
      content: '这是一个沉浸式学习环境，你可以在这里自由探索，走到不同的位置学习不同的教程内容。',
      position: { x: 0, y: 1.6, z: 0 },
      radius: 2,
      type: 'text'
    },
    {
      id: 'tutorial-2',
      title: '书架区域',
      content: '这里是图书馆的书架区域，你可以在这里找到各种学习资料。',
      position: { x: -15, y: 1.6, z: -10 },
      radius: 3,
      type: 'text'
    },
    {
      id: 'tutorial-3',
      title: '阅读区',
      content: '这里是阅读区，你可以在这里休息和学习。',
      position: { x: 0, y: 1.6, z: -5 },
      radius: 2,
      type: 'text'
    }
  ],
  userState: {
    position: { x: 0, y: 1.6, z: 5 },
    rotation: { x: 0, y: 0, z: 0 },
    completedTutorials: [],
    currentTutorial: null
  },
  
  // 动作实现
  setUserPosition: (position) => set((state) => ({
    userState: {
      ...state.userState,
      position
    }
  })),
  
  setUserRotation: (rotation) => set((state) => ({
    userState: {
      ...state.userState,
      rotation
    }
  })),
  
  setCurrentTutorial: (tutorialId) => set((state) => ({
    userState: {
      ...state.userState,
      currentTutorial: tutorialId
    }
  })),
  
  completeTutorial: (tutorialId) => set((state) => ({
    userState: {
      ...state.userState,
      completedTutorials: [...state.userState.completedTutorials, tutorialId],
      currentTutorial: null
    }
  })),
  
  checkTutorialTrigger: () => {
    const { tutorials, userState } = get();
    const { position } = userState;
    
    // 检查是否有教程可以触发
    for (const tutorial of tutorials) {
      // 计算距离
      const distance = Math.sqrt(
        Math.pow(position.x - tutorial.position.x, 2) +
        Math.pow(position.z - tutorial.position.z, 2)
      );
      
      // 如果距离小于触发半径且教程未完成
      if (distance < tutorial.radius && !userState.completedTutorials.includes(tutorial.id)) {
        set({ 
          userState: {
            ...userState,
            currentTutorial: tutorial.id
          }
        });
        break;
      }
    }
  }
}));
