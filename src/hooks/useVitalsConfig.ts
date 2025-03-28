import { useState, useCallback, useEffect } from 'react';
import { create } from 'zustand';

interface VitalsConfig {
  [key: string]: boolean;
}

interface VitalsStore {
  config: VitalsConfig;
  setConfig: (config: VitalsConfig) => void;
}

const defaultConfig: VitalsConfig = {
  bloodPressure: true,
  heartRate: true,
  temperature: true,
  respiratoryRate: false,
  oxygenLevel: true,
  weight: true,
  bloodGlucose: false,
  painLevel: false,
  hydrationLevel: false,
  nutrition: false,
  sleepQuality: false,
  mood: false,
  temperatureTrend: false
};

const useVitalsStore = create<VitalsStore>((set) => ({
  config: (() => {
    try {
      const saved = localStorage.getItem('vitalsConfig');
      return saved ? JSON.parse(saved) : defaultConfig;
    } catch {
      return defaultConfig;
    }
  })(),
  setConfig: (config) => set({ config })
}));

export function useVitalsConfig() {
  const { config, setConfig } = useVitalsStore();

  const toggleVital = useCallback((vital: string) => {
    const updatedConfig = {
      ...config,
      [vital]: !config[vital]
    };
    setConfig(updatedConfig);
    localStorage.setItem('vitalsConfig', JSON.stringify(updatedConfig));
  }, [config, setConfig]);

  return { config, toggleVital };
}