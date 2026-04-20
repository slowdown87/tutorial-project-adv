import * as THREE from 'three';

// 障碍物类型定义
export interface Obstacle {
  x: number;
  z: number;
  radius: number;
}

// 场景边界
const SCENE_BOUNDARY = 38;

// 障碍物配置
const OBSTACLES: Obstacle[] = [
  // 左侧书架
  { x: -35, z: -30, radius: 3.5 },
  { x: -35, z: 0, radius: 3.5 },
  { x: -35, z: 30, radius: 3.5 },
  // 右侧书架
  { x: 35, z: -30, radius: 3.5 },
  { x: 35, z: 0, radius: 3.5 },
  { x: 35, z: 30, radius: 3.5 },
  // 后侧书架
  { x: -30, z: -35, radius: 3.5 },
  { x: 0, z: -35, radius: 3.5 },
  { x: 30, z: -35, radius: 3.5 },
  // 前侧书架
  { x: -30, z: 35, radius: 3.5 },
  { x: 0, z: 35, radius: 3.5 },
  { x: 30, z: 35, radius: 3.5 },
  // 阅读桌
  { x: -15, z: -15, radius: 2.5 },
  { x: 15, z: -15, radius: 2.5 },
  { x: -15, z: 15, radius: 2.5 },
  { x: 15, z: 15, radius: 2.5 },
  // NPC
  { x: 0, z: 0, radius: 2.0 },
];

/**
 * 检测是否与边界碰撞
 */
export const checkBoundaryCollision = (position: THREE.Vector3): boolean => {
  return Math.abs(position.x) > SCENE_BOUNDARY || Math.abs(position.z) > SCENE_BOUNDARY;
};

/**
 * 检测是否与障碍物碰撞
 */
export const checkObstacleCollision = (position: THREE.Vector3): boolean => {
  for (const obstacle of OBSTACLES) {
    const distance = Math.sqrt(
      Math.pow(position.x - obstacle.x, 2) + 
      Math.pow(position.z - obstacle.z, 2)
    );
    if (distance < obstacle.radius) {
      return true;
    }
  }
  return false;
};

/**
 * 检测是否发生碰撞（包括边界和障碍物）
 */
export const checkCollision = (position: THREE.Vector3): boolean => {
  return checkBoundaryCollision(position) || checkObstacleCollision(position);
};

/**
 * 计算滑动向量，用于平滑碰撞响应
 */
export const calculateSlideVector = (
  desiredPosition: THREE.Vector3, 
  currentPosition: THREE.Vector3
): THREE.Vector3 => {
  const result = desiredPosition.clone();
  
  // 简单的单轴滑动
  // 先尝试只移动 x 轴
  const xOnly = new THREE.Vector3(desiredPosition.x, currentPosition.y, currentPosition.z);
  if (!checkCollision(xOnly)) {
    return xOnly;
  }
  
  // 再尝试只移动 z 轴
  const zOnly = new THREE.Vector3(currentPosition.x, currentPosition.y, desiredPosition.z);
  if (!checkCollision(zOnly)) {
    return zOnly;
  }
  
  // 如果都不行，返回当前位置
  return currentPosition.clone();
};

/**
 * 获取所有障碍物位置（用于调试和可视化）
 */
export const getObstaclePositions = (): Obstacle[] => [...OBSTACLES];
