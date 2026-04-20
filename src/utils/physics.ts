// 物理引擎管理
import * as CANNON from 'cannon-es';

// 物理世界实例
let world: CANNON.World | null = null;

// 初始化物理世界
export function initPhysics() {
  if (!world) {
    world = new CANNON.World();
    world.gravity.set(0, -9.82, 0); // 设置重力
    world.broadphase = new CANNON.NaiveBroadphase();
  }
  return world;
}

// 获取物理世界实例
export function getPhysicsWorld() {
  return world || initPhysics();
}

// 创建碰撞体
export function createCollisionBody(
  shape: CANNON.Shape,
  position: CANNON.Vec3,
  mass: number = 0 // 0 表示静态物体
) {
  const body = new CANNON.Body({
    mass,
    position,
    shape
  });
  getPhysicsWorld().addBody(body);
  return body;
}

// 更新物理世界
export function updatePhysics(delta: number) {
  world?.step(delta);
}

// 清理物理世界
export function cleanupPhysics() {
  if (world) {
    // 移除所有物体
    for (const body of world.bodies) {
      world.removeBody(body);
    }
    world = null;
  }
}
