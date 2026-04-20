import React, { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { getPhysicsWorld } from '../utils/physics';

interface DragControlsProps {
  movementSpeed?: number;
  lookSpeed?: number;
}

const DragControls: React.FC<DragControlsProps> = ({ 
  movementSpeed = 1.0,
  lookSpeed = 0.002
}) => {
  const { camera, gl } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const eulerRef = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const lastMousePos = useRef({ x: 0, y: 0 });
  const keysRef = useRef({ w: false, a: false, s: false, d: false });

  // 键盘移动控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        if (key === 'w' || key === 'arrowup') keysRef.current.w = true;
        if (key === 'a' || key === 'arrowleft') keysRef.current.a = true;
        if (key === 's' || key === 'arrowdown') keysRef.current.s = true;
        if (key === 'd' || key === 'arrowright') keysRef.current.d = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') keysRef.current.w = false;
      if (key === 'a' || key === 'arrowleft') keysRef.current.a = false;
      if (key === 's' || key === 'arrowdown') keysRef.current.s = false;
      if (key === 'd' || key === 'arrowright') keysRef.current.d = false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 鼠标拖拽控制
  useEffect(() => {
    const canvas = gl.domElement;

    // 防止默认鼠标行为
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) { // 左键
        setIsDragging(true);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        canvas.style.cursor = 'grabbing';
        canvas.focus?.();
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      canvas.style.cursor = 'default';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;

      eulerRef.current.setFromQuaternion(camera.quaternion);
      eulerRef.current.y += deltaX * lookSpeed;
      eulerRef.current.x += deltaY * lookSpeed;

      // 限制垂直视角
      eulerRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, eulerRef.current.x));

      camera.quaternion.setFromEuler(eulerRef.current);

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('contextmenu', handleContextMenu);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [gl, camera, isDragging, lookSpeed]);

  // 移动逻辑
  useFrame((_, delta) => {
    const { w, a, s, d } = keysRef.current;
    if (!w && !a && !s && !d) return;

    const direction = new THREE.Vector3();
    direction.set(0, 0, 0);

    if (w) direction.z -= 1;
    if (s) direction.z += 1;
    if (a) direction.x -= 1;
    if (d) direction.x += 1;

    if (direction.length() > 0) {
      direction.normalize();
      direction.applyEuler(new THREE.Euler(0, camera.rotation.y, 0));
      const speed = movementSpeed * delta;
      
      // 计算目标位置
      const targetPosition = camera.position.clone();
      targetPosition.addScaledVector(direction, speed);
      
      // 使用物理引擎检测碰撞
      const world = getPhysicsWorld();
      const playerShape = new CANNON.Sphere(0.5); // 玩家碰撞体
      const playerBody = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(targetPosition.x, targetPosition.y, targetPosition.z),
        shape: playerShape
      });
      
      // 检测与所有静态物体的碰撞
      let collision = false;
      for (const body of world.bodies) {
        if (body.mass === 0) { // 只检测静态物体
          const contact = new CANNON.ContactMaterial(playerBody.material, body.material, {
            friction: 0.3,
            restitution: 0.1
          });
          world.addContactMaterial(contact);
          
          // 检测碰撞
          const distance = playerBody.position.distanceTo(body.position);
          const minDistance = playerShape.radius + body.shapes[0].boundingSphereRadius;
          
          if (distance < minDistance) {
            collision = true;
            break;
          }
        }
      }
      
      // 如果没有碰撞，移动相机
      if (!collision) {
        camera.position.copy(targetPosition);
      }
    }
  });

  return null;
};

export default DragControls;
