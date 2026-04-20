import React, { useRef, useEffect } from 'react';
import { useTutorialStore } from '../store/tutorialStore';

const Minimap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { userState } = useTutorialStore();
  const userPosition = userState.position;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 设置背景
    ctx.fillStyle = '#2c1a1d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制边框
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // 比例尺：将场景坐标映射到画布坐标
    const scale = 1.5; // 缩放比例
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 绘制墙壁
    ctx.fillStyle = '#5c4033';
    // 外墙边界
    const wallSize = 120 * scale;
    const wallOffset = 10;
    ctx.fillRect(wallOffset, wallOffset, wallSize, wallSize);

    // 绘制书架区域
    ctx.fillStyle = '#8b4513';
    // 左侧书架
    ctx.fillRect(15, 15, 20 * scale, 90 * scale);
    // 右侧书架
    ctx.fillRect(canvas.width - 35, 15, 20 * scale, 90 * scale);
    // 上方书架
    ctx.fillRect(15, 15, 90 * scale, 20 * scale);
    // 下方书架
    ctx.fillRect(15, canvas.height - 35, 90 * scale, 20 * scale);

    // 绘制特殊书架
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(canvas.width / 2 - 25, 50, 50, 10);
    ctx.fillRect(canvas.width / 2 - 25, canvas.height - 60, 50, 10);

    // 绘制柱子
    ctx.fillStyle = '#654321';
    const pillarPositions = [
      { x: 30, y: 30 },
      { x: canvas.width - 30, y: 30 },
      { x: 30, y: canvas.height - 30 },
      { x: canvas.width - 30, y: canvas.height - 30 },
      { x: canvas.width / 2, y: 30 },
      { x: canvas.width / 2, y: canvas.height - 30 },
    ];
    pillarPositions.forEach(pos => {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // 计算用户在小地图上的位置
    const userMapX = centerX + (userPosition.x * scale);
    const userMapY = centerY - (userPosition.z * scale); // 注意z轴方向

    // 绘制用户位置（带方向的箭头）
    ctx.save();
    ctx.translate(userMapX, userMapY);
    // 使用用户的旋转方向（简化处理）
    // 绘制箭头
    ctx.fillStyle = '#32cd32';
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(-6, 6);
    ctx.lineTo(0, 3);
    ctx.lineTo(6, 6);
    ctx.closePath();
    ctx.fill();
    
    // 绘制闪烁效果
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(50, 205, 50, 0.5)';
    ctx.fill();
    
    ctx.restore();

    // 绘制图例
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px serif';
    ctx.fillText('你在这里', userMapX - 20, userMapY + 25);
    ctx.fillStyle = '#32cd32';
    ctx.beginPath();
    ctx.arc(userMapX + 45, userMapY + 20, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText('= 你的位置', userMapX + 52, userMapY + 23);

  }, [userPosition]);

  return (
    <div className="fixed top-4 right-4 z-50 pointer-events-none">
      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-[#d4af37]/30 pointer-events-auto">
        <div className="text-[#d4af37] text-xs mb-2 font-serif text-center">图书馆地图</div>
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          className="rounded border border-[#d4af37]/30"
        />
        <div className="text-gray-300 text-xs mt-1 text-center">
          地图比例尺 1:100
        </div>
      </div>
    </div>
  );
};

export default Minimap;
