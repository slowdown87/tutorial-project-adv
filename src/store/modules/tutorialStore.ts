import { create } from 'zustand';
import { useUserStore } from './userStore';

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

// 教程状态管理store
export const useTutorialStore = create<{
  // 状态
  tutorials: TutorialContent[];
  
  // 动作
  checkTutorialTrigger: () => void;
}>((set, get) => ({
  // 初始状态
  tutorials: [
    {
      id: 'welcome',
      title: '欢迎来到智慧图书馆',
      content: '欢迎来到沉浸式3D教程图书馆！这里整合了完整的学习教程。\n\n你可以：\n- 使用 WASD 或方向键自由探索\n- 按住鼠标左键拖动来控制视角\n- 走到金色发光圆环的位置来学习教程\n- 按空格键或点击按钮完成当前教程\n\n每个位置都对应不同的学习内容，开始你的探索之旅吧！',
      position: { x: 0, y: 1.6, z: 10 },
      radius: 3,
      type: 'text'
    },
    {
      id: 'chapter01',
      title: '第一章：开始探索',
      content: '很好！你已经找到了第一个学习点。让我们继续探索吧。\n\n在这个智慧图书馆中，你将学习到：\n- 如何在3D环境中自由移动\n- 如何与虚拟环境中的元素交互\n- 如何完成各种学习任务\n\n记住，周围的金色发光圆环就是下一个学习点，快去找找吧！',
      position: { x: -10, y: 1.6, z: -10 },
      radius: 3,
      type: 'text'
    },
    {
      id: 'chapter02',
      title: '第二章：认识环境',
      content: '你做得很棒！继续向前探索吧。\n\n这个图书馆有：\n- 四周的书架，上面摆满了各种书籍\n- 舒适的阅读桌椅，可以休息学习\n- 绿色的植物点缀，让环境更加温馨\n- 中心位置的图书管理员，可以与他对话\n\n多走走看看，熟悉一下这个环境！',
      position: { x: 10, y: 1.6, z: -10 },
      radius: 3,
      type: 'text'
    },
    {
      id: 'chapter03',
      title: '第三章：与NPC对话',
      content: '你已经探索了不少地方了！\n\n注意到图书馆中心的图书管理员了吗？试试点击他，看看会发生什么。\n\n他会给你一些有用的提示和建议。和他聊完后，继续你的旅程吧！',
      position: { x: -10, y: 1.6, z: 10 },
      radius: 3,
      type: 'text'
    },
    {
      id: 'chapter04',
      title: '第四章：深入学习',
      content: '你已经掌握了基本的操作！\n\n接下来，继续探索图书馆的每一个角落。每个学习点都会有新的知识等待你发现。\n\n记住，完成的学习点会消失，这样你就知道还有哪些没有学习了。加油！',
      position: { x: 10, y: 1.6, z: 10 },
      radius: 3,
      type: 'text'
    },
    {
      id: 'chapter05',
      title: '第五章：学习总结',
      content: '恭喜你！你已经完成了所有的教程内容！\n\n通过这次学习，你应该掌握了：\n- 3D环境下的移动和视角控制\n- 与虚拟物体和NPC的交互\n- 探索式学习的方法\n\n希望你在智慧图书馆中度过了愉快的时光！如果想再复习一遍，可以刷新页面重新开始。',
      position: { x: 0, y: 1.6, z: -10 },
      radius: 3,
      type: 'text'
    }
  ],
  
  // 动作实现
  checkTutorialTrigger: () => {
    const { tutorials } = get();
    const { userState } = useUserStore.getState();
    const { position } = userState;
    
    // 如果当前已经有教程在显示，不处理
    if (userState.currentTutorial) return;
    
    // 检查是否有教程可以触发
    for (const tutorial of tutorials) {
      // 计算距离
      const distance = Math.sqrt(
        Math.pow(position.x - tutorial.position.x, 2) +
        Math.pow(position.z - tutorial.position.z, 2)
      );
      
      // 如果距离小于触发半径且教程未完成
      if (distance < tutorial.radius && !userState.completedTutorials.includes(tutorial.id)) {
        useUserStore.getState().setCurrentTutorial(tutorial.id);
        break;
      }
    }
  }
}));
