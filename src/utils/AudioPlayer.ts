export class AudioPlayer {
  private static instance: AudioPlayer;
  private speechSynthesis: SpeechSynthesis | null = null;
  private audioContext: AudioContext | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.speechSynthesis = window.speechSynthesis;
      this.audioContext = new AudioContext();
    }
  }

  public static getInstance(): AudioPlayer {
    if (!AudioPlayer.instance) {
      AudioPlayer.instance = new AudioPlayer();
    }
    return AudioPlayer.instance;
  }

  public speak(text: string): void {
    if (this.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8; // Slower speech for kids
      utterance.pitch = 1.2; // Higher pitch for kid-friendly voice
      this.speechSynthesis.speak(utterance);
    }
  }

  public playSound(soundUrl: string): void {
    const audio = new Audio(soundUrl);
    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });
  }

  public stopSpeaking(): void {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
  }
} 