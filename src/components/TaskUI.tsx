import React from 'react';
import { useTaskStore } from '../store';

// 任务UI组件
export default function TaskUI() {
  const { tasks, currentTaskId, setCurrentTask, completeTask } = useTaskStore();
  
  // 获取当前任务
  const currentTask = tasks.find(task => task.id === currentTaskId);
  
  // 处理任务点击
  const handleTaskClick = (taskId: string) => {
    setCurrentTask(taskId);
  };
  
  // 处理任务完成
  const handleCompleteTask = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    completeTask(taskId);
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* 任务面板 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 w-80 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">任务</h3>
        
        {/* 当前任务 */}
        {currentTask && (
          <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-100">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-blue-800">{currentTask.title}</h4>
              <button 
                onClick={(e) => handleCompleteTask(currentTask.id, e)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${currentTask.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}
              >
                {currentTask.completed ? '已完成' : '完成'}
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">{currentTask.description}</p>
            <div className="mt-2 h-1 bg-gray-200 rounded-full">
              <div 
                className="h-1 bg-blue-500 rounded-full" 
                style={{ width: `${currentTask.progress}%` }}
              />
            </div>
          </div>
        )}
        
        {/* 任务列表 */}
        <div className="space-y-2">
          {tasks.map(task => (
            <div 
              key={task.id}
              onClick={() => handleTaskClick(task.id)}
              className={`p-2 rounded-md cursor-pointer transition-colors ${task.id === currentTaskId ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{task.title}</span>
                <span className={`text-xs ${task.completed ? 'text-green-600' : 'text-gray-500'}`}>
                  {task.completed ? '✓' : `${task.progress}%`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
