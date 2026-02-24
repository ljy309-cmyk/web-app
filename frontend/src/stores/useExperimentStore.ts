import { create } from "zustand";

interface ExperimentState {
  temperature: number;
  magneticField: number;
  setTemperature: (value: number) => void;
  setMagneticField: (value: number) => void;
}

export const useExperimentStore = create<ExperimentState>((set) => ({
  temperature: 100,
  magneticField: 0,
  setTemperature: (value) => set({ temperature: value }),
  setMagneticField: (value) => set({ magneticField: value }),
}));
