// 音效管理工具

// 音效类型定义
export type SoundType = 'footstep' | 'book' | 'ui' | 'ambient' | 'dialog';

// 音效管理类
class AudioManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private isInitialized = false;

  // 初始化音频上下文
  async init() {
    if (!this.isInitialized) {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.isInitialized = true;
        console.log('音频系统初始化成功');
      } catch (error) {
        console.error('音频系统初始化失败:', error);
      }
    }
  }

  // 加载音效
  async loadSound(name: string, url: string) {
    if (!this.isInitialized) {
      await this.init();
    }

    if (!this.audioContext) {
      console.error('音频上下文未初始化');
      return;
    }

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.sounds.set(name, audioBuffer);
      console.log(`音效加载成功: ${name}`);
    } catch (error) {
      console.error(`音效加载失败: ${name}`, error);
    }
  }

  // 播放音效
  playSound(name: string, volume: number = 0.5, pitch: number = 1) {
    if (!this.isInitialized || !this.audioContext || !this.sounds.has(name)) {
      return;
    }

    try {
      // 确保音频上下文处于活动状态
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const buffer = this.sounds.get(name)!;
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      source.buffer = buffer;
      source.playbackRate.value = pitch;
      gainNode.gain.value = volume;

      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      source.start();
    } catch (error) {
      console.error(`音效播放失败: ${name}`, error);
    }
  }

  // 停止所有音效
  stopAllSounds() {
    // 由于Web Audio API的限制，我们无法直接停止所有正在播放的音效
    // 但我们可以通过创建新的音频上下文来实现类似效果
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
      this.isInitialized = false;
      console.log('所有音效已停止');
    }
  }

  // 获取音效是否加载
  isSoundLoaded(name: string): boolean {
    return this.sounds.has(name);
  }

  // 获取加载的音效数量
  getLoadedSoundsCount(): number {
    return this.sounds.size;
  }
}

// 导出单例实例
export const audioManager = new AudioManager();
