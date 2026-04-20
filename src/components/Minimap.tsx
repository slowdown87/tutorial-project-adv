import React, { useRef, useEffect, useState } from 'react';
import { useUserStore, useTutorialStore } from '../store';

// 场景边界（与 LibraryScene 一致）
const SCENE_MIN = -40;
const SCENE_MAX = 40;
const SCENE_SIZE = SCENE_MAX - SCENE_MIN;

// 小地图尺寸
const MAP_SIZE = 180;
const MAP_PADDING = 10;

const Minimap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { userState } = useUserStore();
  const { tutorials } = useTutorialStore();
  const userPosition = userState.position;
  const [isVisible, setIsVisible] = useState(true);
  const [zoom, setZoom] = useState(1.0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // 坐标转换：世界坐标 -> 画布坐标
  const worldToCanvas = (x: number, z: number) => {
    const normalizedX = (x - SCENE_MIN) / SCENE_SIZE;
    const normalizedZ = (z - SCENE_MIN) / SCENE_SIZE;
    const scaledSize = MAP_SIZE * zoom;
    const centerX = MAP_PADDING + MAP_SIZE / 2;
    const centerY = MAP_PADDING + MAP_SIZE / 2;
    return {
      x: centerX + (normalizedX * scaledSize - MAP_SIZE / 2) + offset.x,
      y: centerY + (normalizedZ * scaledSize - MAP_SIZE / 2) + offset.y
    };
  };

  // 鼠标事件处理
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  // 缩放控制
  const handleZoomIn = () => {
    setZoom(Math.min(2.0, zoom + 0.2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(0.5, zoom - 0.2));
  };

  const handleResetZoom = () => {
    setZoom(1.0);
    setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 设置背景
    ctx.fillStyle = '#1a1408';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制边框
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.strokeRect(MAP_PADDING, MAP_PADDING, MAP_SIZE, MAP_SIZE);

    // 绘制墙壁
    ctx.fillStyle = '#5c3a20';
    ctx.fillRect(MAP_PADDING, MAP_PADDING, MAP_SIZE, 4); // 顶墙
    ctx.fillRect(MAP_PADDING, MAP_PADDING + MAP_SIZE - 4, MAP_SIZE, 4); // 底墙
    ctx.fillRect(MAP_PADDING, MAP_PADDING, 4, MAP_SIZE); // 左墙
    ctx.fillRect(MAP_PADDING + MAP_SIZE - 4, MAP_PADDING, 4, MAP_SIZE); // 右墙

    // 绘制书架
    ctx.fillStyle = '#4c3020';
    const bookshelfPositions = [
      [-35, -30], [-35, 0], [-35, 30],
      [35, -30], [35, 0], [35, 30],
      [-30, -35], [0, -35], [30, -35],
      [-30, 35], [0, 35], [30, 35]
    ];
    bookshelfPositions.forEach(([x, z]) => {
      const pos = worldToCanvas(x, z);
      ctx.fillRect(pos.x - 6, pos.y - 6, 12, 12);
    });

    // 绘制阅读桌
    ctx.fillStyle = '#7c5c2c';
    const deskPositions = [[-15, -15], [15, -15], [-15, 15], [15, 15]];
    deskPositions.forEach(([x, z]) => {
      const pos = worldToCanvas(x, z);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // 绘制植物
    ctx.fillStyle = '#2a9a2a';
    const plantPositions = [[-25, 0], [25, 0], [0, -25], [0, 25]];
    plantPositions.forEach(([x, z]) => {
      const pos = worldToCanvas(x, z);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // 绘制区域标记
    // 入口区域
    ctx.fillStyle = 'rgba(100, 149, 237, 0.2)';
    ctx.beginPath();
    ctx.arc(worldToCanvas(0, 0).x, worldToCanvas(0, 0).y, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(100, 149, 237, 0.6)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // 教程区域
    ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(worldToCanvas(3, 3).x, worldToCanvas(3, 3).y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // 阅读区域
    ctx.fillStyle = 'rgba(144, 238, 144, 0.2)';
    ctx.beginPath();
    ctx.arc(worldToCanvas(-15, -15).x, worldToCanvas(-15, -15).y, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(144, 238, 144, 0.6)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // 绘制图书管理员位置
    const librarianPos = worldToCanvas(0, 0);
    ctx.fillStyle = '#4a3728';
    ctx.beginPath();
    ctx.arc(librarianPos.x, librarianPos.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#e0c9a6';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 绘制教程热点
    tutorials.forEach(tutorial => {
      const isCompleted = userState.completedTutorials.includes(tutorial.id);
      const hotspotPos = worldToCanvas(tutorial.position.x, tutorial.position.z);
      
      // 外圈
      ctx.beginPath();
      ctx.arc(hotspotPos.x, hotspotPos.y, isCompleted ? 5 : 7, 0, Math.PI * 2);
      ctx.strokeStyle = isCompleted ? '#666' : '#d4af37';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // 内圈
      if (!isCompleted) {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(hotspotPos.x, hotspotPos.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 计算用户在小地图上的位置
    const userCanvasPos = worldToCanvas(userPosition.x, userPosition.z);

    // 绘制用户位置（带方向的箭头）
    ctx.save();
    ctx.translate(userCanvasPos.x, userCanvasPos.y);
    
    // 根据用户视角旋转箭头（反转方向以匹配实际视角）
    const userRotation = userState.rotation.y;
    ctx.rotate(-userRotation); // 反转旋转方向以匹配实际视角
    
    // 绘制闪烁效果
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(50, 205, 50, 0.3)';
    ctx.fill();
    
    // 绘制箭头（方向朝前）
    ctx.fillStyle = '#32cd32';
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(-5, 5);
    ctx.lineTo(0, 2);
    ctx.lineTo(5, 5);
    ctx.closePath();
    ctx.fill();
    
    // 箭头边框
    ctx.strokeStyle = '#228B22';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    ctx.restore();

  }, [userPosition, userState.rotation, tutorials, userState.completedTutorials, zoom, offset]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '16px',
      right: '16px',
      zIndex: 9999,
      width: '220px',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      padding: '10px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
      border: '1px solid rgba(212, 175, 55, 0.4)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <div style={{
          color: '#d4af37',
          fontSize: '13px',
          fontFamily: 'serif',
          fontWeight: 'bold'
        }}>图书馆地图</div>
        <button 
          onClick={() => setIsVisible(false)}
          style={{
            backgroundColor: 'rgba(212, 175, 55, 0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '22px',
            height: '22px',
            color: '#d4af37',
            cursor: 'pointer',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)'}
        >×</button>
      </div>
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        style={{
          width: '100%',
          borderRadius: '6px',
          border: '1px solid rgba(212, 175, 55, 0.3)',
        }}
      />
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '8px',
        fontSize: '9px',
        color: 'rgba(255, 255, 255, 0.7)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: '#32cd32', borderRadius: '50%' }}></div>
          <span>你的位置</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: '#FFD700', borderRadius: '50%' }}></div>
          <span>学习点</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: '#6495ED', borderRadius: '50%', opacity: 0.7 }}></div>
          <span>入口区域</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: '#90EE90', borderRadius: '50%', opacity: 0.7 }}></div>
          <span>阅读区域</span>
        </div>
      </div>
    </div>
  );
};

export default Minimap;
