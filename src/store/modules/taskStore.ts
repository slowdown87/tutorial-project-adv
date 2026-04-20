// 任务系统存储
import { create } from 'zustand';

// 任务类型定义
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
  type: 'exploration' | 'tutorial' | 'interaction';
  location?: { x: number; y: number; z: number };
}

// 任务存储状态
export interface TaskState {
  tasks: Task[];
  currentTaskId: string | null;
  addTask: (task: Omit<Task, 'id' | 'completed' | 'progress'>) => void;
  completeTask: (taskId: string) => void;
  updateTaskProgress: (taskId: string, progress: number) => void;
  setCurrentTask: (taskId: string | null) => void;
  resetTasks: () => void;
}

// 创建任务存储
export const useTaskStore = create<TaskState>((set) => ({
  tasks: [
    {
      id: 'task-1',
      title: '探索图书馆',
      description: '在图书馆中四处走走，熟悉环境',
      completed: false,
      progress: 0,
      type: 'exploration',
    },
    {
      id: 'task-2',
      title: '与图书管理员交谈',
      description: '找到图书管理员并点击与他交谈',
      completed: false,
      progress: 0,
      type: 'interaction',
      location: { x: 0, y: 0, z: -5 },
    },
    {
      id: 'task-3',
      title: '开始教程',
      description: '走到金色圆环位置开始学习教程',
      completed: false,
      progress: 0,
      type: 'tutorial',
      location: { x: 3, y: 0, z: 3 },
    },
  ],
  currentTaskId: 'task-1',
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, {
      ...task,
      id: `task-${Date.now()}`,
      completed: false,
      progress: 0,
    }],
  })),
  completeTask: (taskId) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === taskId ? { ...task, completed: true, progress: 100 } : task
    ),
  })),
  updateTaskProgress: (taskId, progress) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === taskId ? { ...task, progress } : task
    ),
  })),
  setCurrentTask: (taskId) => set({ currentTaskId: taskId }),
  resetTasks: () => set({
    tasks: [
      {
        id: 'task-1',
        title: '探索图书馆',
        description: '在图书馆中四处走走，熟悉环境',
        completed: false,
        progress: 0,
        type: 'exploration',
      },
      {
        id: 'task-2',
        title: '与图书管理员交谈',
        description: '找到图书管理员并点击与他交谈',
        completed: false,
        progress: 0,
        type: 'interaction',
        location: { x: 0, y: 0, z: -5 },
      },
      {
        id: 'task-3',
        title: '开始教程',
        description: '走到金色圆环位置开始学习教程',
        completed: false,
        progress: 0,
        type: 'tutorial',
        location: { x: 3, y: 0, z: 3 },
      },
    ],
    currentTaskId: 'task-1',
  }),
}));
