// 导出所有store
import { useUserStore, UserState } from './modules/userStore';
import { useTutorialStore, TutorialContent } from './modules/tutorialStore';
import { useTaskStore, Task } from './modules/taskStore';

export {
  useUserStore,
  useTutorialStore,
  useTaskStore,
  UserState,
  TutorialContent,
  Task
};
