import React, { useState } from 'react';
import { Text } from '@react-three/drei';
import { useAudio } from '../../utils/audio';

// 图书管理员组件
export default function Librarian({ position }: { position: [number, number, number] }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(0);
  const dialogues = [
    "欢迎来到智慧图书馆！这里有丰富的知识等待探索。",
    "需要帮助找到什么书籍吗？",
    "走到金色圆环的位置就可以开始学习教程了。",
    "祝你在知识的海洋中遨游愉快！"
  ];

  const { playSound } = useAudio();

  const handleClick = () => {
    playSound('dialog', 0.7);
    if (!isDialogOpen) {
      setIsDialogOpen(true);
    } else {
      if (dialogIndex < dialogues.length - 1) {
        setDialogIndex(dialogIndex + 1);
      } else {
        setDialogIndex(0);
        setIsDialogOpen(false);
      }
    }
  };

  return (
    <group position={position}>
      <group onClick={handleClick}>
        {/* 身体 */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.5, 1.2, 16]} />
          <meshStandardMaterial
            color="#4a3728"
            roughness={0.8}
          />
        </mesh>

        {/* 头 */}
        <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial
            color="#e0c9a6"
            roughness={0.7}
          />
        </mesh>

        {/* 帽子 */}
        <mesh position={[0, 2.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.2, 0.2, 16]} />
          <meshStandardMaterial
            color="#2a1a10"
            roughness={0.8}
          />
        </mesh>
      </group>

      {/* 对话气泡 */}
      {isDialogOpen && (
        <group position={[0, 3.5, 0]}>
          <mesh position={[0, 0, -0.05]}>
            <boxGeometry args={[3, 1.2, 0.1]} />
            <meshStandardMaterial
              color="#fffef0"
              roughness={0.5}
            />
          </mesh>
          <Text
            position={[0, 0, 0.05]}
            fontSize={0.2}
            color="#333"
            anchorX="center"
            anchorY="middle"
            maxWidth={2.8}
          >
            {dialogues[dialogIndex]}
          </Text>
        </group>
      )}

      {/* 提示文字 */}
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.25}
        color="#d4af37"
        anchorX="center"
      >
        点击交谈
      </Text>
    </group>
  );
}
