import { create } from 'zustand';

interface SettingsState {
  soundEnabled: boolean;
  voiceAutoPlay: boolean;
  compactMode: boolean;
  toggleSound: () => void;
  toggleVoiceAutoPlay: () => void;
  toggleCompactMode: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  soundEnabled: true,
  voiceAutoPlay: true,
  compactMode: false,

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  toggleVoiceAutoPlay: () => set((state) => ({ voiceAutoPlay: !state.voiceAutoPlay })),
  toggleCompactMode: () => set((state) => ({ compactMode: !state.compactMode })),
}));
