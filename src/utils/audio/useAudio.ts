// 音效钩子
import { useEffect } from 'react';
import { audioManager } from './audioManager';

// 音效配置
export const soundConfig = {
  footstep: 'https://assets.mixkit.co/sfx/preview/mixkit-quick-light-footsteps-on-wood-2194.mp3',
  book: 'https://assets.mixkit.co/sfx/preview/mixkit-book-page-flip-1436.mp3',
  ui: 'https://assets.mixkit.co/sfx/preview/mixkit-software-interface-back-2575.mp3',
  ambient: 'https://assets.mixkit.co/sfx/preview/mixkit-small-happy-bells-1613.mp3',
  dialog: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3'
};

// 音效钩子
export function useAudio() {
  // 加载所有音效
  useEffect(() => {
    const loadSounds = async () => {
      await audioManager.init();
      
      // 加载所有音效
      for (const [name, url] of Object.entries(soundConfig)) {
        await audioManager.loadSound(name, url);
      }
    };

    loadSounds();

    // 清理函数
    return () => {
      // 停止所有音效
      audioManager.stopAllSounds();
    };
  }, []);

  // 播放音效的方法
  const playSound = (name: keyof typeof soundConfig, volume: number = 0.5, pitch: number = 1) => {
    audioManager.playSound(name, volume, pitch);
  };

  // 停止所有音效的方法
  const stopAllSounds = () => {
    audioManager.stopAllSounds();
  };

  return {
    playSound,
    stopAllSounds,
    audioManager
  };
}
