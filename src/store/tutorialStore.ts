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
      id: 'welcome',
      title: '欢迎来到3D教程图书馆',
      content: '欢迎来到沉浸式3D教程图书馆！这里整合了Solo Trae Web Code的完整教程。\n\n你可以：\n- 自由探索图书馆环境\n- 走到金色圆环处学习教程\n- 按空格键跳过当前教程\n- 使用WASD/箭头键移动\n- 鼠标拖动控制视角\n\n每个位置都对应教程的不同章节，开始你的学习之旅吧！',
      position: { x: 0, y: 1.6, z: 0 },
      radius: 3,
      type: 'text'
    },
    {
      id: 'chapter01',
      title: '第1章：初识Solo Trae Web版',
      content: 'Solo Trae Web Code是一个强大的智能编程助手，专门为Web开发和项目制作设计。\n\n**主要特点：**\n- ✅ 智能理解：能理解自然语言，支持中文交流\n- ✅ 功能全面：支持多种编程语言，提供完整开发工具链\n- ✅ 易于使用：界面友好，操作简单\n- ✅ 持续学习：由Trae团队持续优化\n\n**它能帮你：**\n- 编写代码和调试问题\n- 管理项目和创建文档\n- 规划项目和设计方案\n- 生成教程和发布项目',
      position: { x: -15, y: 1.6, z: -15 },
      radius: 3,
      type: 'text'
    },
    {
      id: 'chapter02',
      title: '第2章：需求分析与规划',
      content: '在开始项目之前，我们需要明确目标并进行规划。\n\n**明确目标：**\n- 制作一个完整的教程项目\n- 学习Solo Trae Web Code的使用\n- 掌握GitHub Pages部署\n\n**方案选择：**\n- 考虑国内环境下的平台选择\n- 分析为什么需要国内替代方案\n- 为项目做好充分的规划\n\n**规划步骤：**\n1. 分析需求和目标\n2. 设计项目结构\n3. 制定实施计划\n4. 准备所需资源',
      position: { x: 15, y: 1.6, z: -15 },
      radius: 3,
      type: 'text'
    },
    {
      id: 'chapter03',
      title: '第3章：项目初始化',
      content: '项目初始化是开发的第一步，包括项目配置与设置。\n\n**初始化步骤：**\n1. 创建新项目\n2. 配置项目设置\n3. 安装必要的依赖\n4. 搭建项目结构\n\n**项目配置：**\n- 配置TypeScript和ESLint\n- 设置Tailwind CSS\n- 配置Vite构建工具\n- 准备部署环境\n\n**项目结构：**\n- src/ - 源代码目录\n- components/ - 组件\n- pages/ - 页面\n- store/ - 状态管理\n- assets/ - 静态资源',
      position: { x: -15, y: 1.6, z: 15 },
      radius: 3,
      type: 'text'
    },
    {
      id: 'chapter04',
      title: '第4章：GitHub Pages配置',
      content: 'GitHub Pages是一个免费的静态网站托管服务。\n\n**配置步骤：**\n1. 创建GitHub仓库\n2. 生成访问令牌\n3. 配置部署脚本\n4. 推送代码到GitHub\n\n**国内环境考虑：**\n- 选择合适的平台\n- 配置访问令牌\n- 解决网络问题\n- 确保部署成功\n\n**部署命令：**\n- npm run build - 构建项目\n- npm run deploy - 部署到GitHub Pages',
      position: { x: 15, y: 1.6, z: 15 },
      radius: 3,
      type: 'text'
    },
    {
      id: 'chapter05',
      title: '第5章：同步教程生成机制',
      content: '同步教程生成是一种边做边记录的教程创作方法。\n\n**什么是同步教程生成：**\n- 在制作项目的同时生成教程\n- 记录每一步操作和思考过程\n- 实时整理和组织内容\n\n**目录结构设计：**\n- 按章节组织内容\n- 每个章节包含多个部分\n- 支持Markdown和HTML格式\n- 包含图片和示例代码\n\n**Git工作流：**\n- 初始化Git仓库\n- 提交代码更改\n- 推送至远程仓库\n- 管理版本历史',
      position: { x: -5, y: 1.6, z: -5 },
      radius: 2.5,
      type: 'text'
    },
    {
      id: 'chapter06',
      title: '第6章：制作教程内容',
      content: '制作高质量的教程内容需要良好的结构和清晰的表达。\n\n**教程结构设计：**\n- 明确的学习目标\n- 分步骤的操作指南\n- 清晰的章节划分\n- 适当的示例和练习\n\n**记录操作步骤：**\n- 详细记录每一步操作\n- 说明操作的目的和效果\n- 提供替代方案和注意事项\n- 保持逻辑连贯和清晰\n\n**截图技巧与规范：**\n- 截取关键操作界面\n- 使用适当的尺寸和分辨率\n- 添加必要的标注和说明\n- 保持截图风格一致',
      position: { x: 5, y: 1.6, z: -5 },
      radius: 2.5,
      type: 'text'
    },
    {
      id: 'chapter07',
      title: '第7章：项目开发',
      content: '项目开发是将想法转化为实际应用的过程。\n\n**需求分析：**\n- 理解用户需求\n- 分析功能要求\n- 确定技术方案\n- 制定开发计划\n\n**项目设计：**\n- 设计用户界面\n- 规划数据结构\n- 设计组件架构\n- 制定技术选型\n\n**项目实现：**\n- 编写核心代码\n- 实现功能模块\n- 测试和调试\n- 优化性能和用户体验',
      position: { x: -5, y: 1.6, z: 5 },
      radius: 2.5,
      type: 'text'
    },
    {
      id: 'chapter08',
      title: '第8章：项目部署',
      content: '项目部署是将开发完成的应用发布到线上的过程。\n\n**部署准备：**\n- 检查代码质量\n- 优化性能\n- 配置环境变量\n- 准备部署脚本\n\n**项目部署：**\n- 构建生产版本\n- 配置部署平台\n- 执行部署命令\n- 验证部署结果\n\n**项目维护与更新：**\n- 监控应用状态\n- 收集用户反馈\n- 修复问题和bug\n- 持续优化和更新',
      position: { x: 5, y: 1.6, z: 5 },
      radius: 2.5,
      type: 'text'
    },
    {
      id: 'chapter09',
      title: '第9章：项目总结',
      content: '项目总结是对整个开发过程的回顾和反思。\n\n**项目成果：**\n- 完成了完整的教程项目\n- 学习了Solo Trae Web Code的使用\n- 掌握了GitHub Pages部署\n- 学会了同步教程生成方法\n\n**经验教训：**\n- 项目规划的重要性\n- 代码质量的保障\n- 部署流程的优化\n- 教程制作的技巧\n\n**未来展望：**\n- 继续学习和探索新技术\n- 完善和扩展项目功能\n- 分享经验和知识\n- 参与开源社区',
      position: { x: 0, y: 1.6, z: -8 },
      radius: 3,
      type: 'text'
    }
  ],
  userState: {
    position: { x: 0, y: 1.6, z: 8 },
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
