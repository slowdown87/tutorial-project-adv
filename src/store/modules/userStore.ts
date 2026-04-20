import { create } from 'zustand';

// 用户状态数据结构
export interface UserState {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  completedTutorials: string[];
  currentTutorial: string | null;
}

// 用户状态管理store
export const useUserStore = create<{
  // 状态
  userState: UserState;
  
  // 动作
  setUserPosition: (position: { x: number; y: number; z: number }) => void;
  setUserRotation: (rotation: { x: number; y: number; z: number }) => void;
  setCurrentTutorial: (tutorialId: string | null) => void;
  completeTutorial: (tutorialId: string) => void;
}>((set) => ({
  // 初始状态
  userState: {
    position: { x: 0, y: 1.6, z: 10 },
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
  }))
}));
