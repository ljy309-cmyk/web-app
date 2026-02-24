"use client";

import Header from "@/components/Header";
import ControlPanel from "@/components/ControlPanel";
import ExperimentChart from "@/components/ExperimentChart";
import { useExperimentStore } from "@/stores/useExperimentStore";

export default function HomePage() {
  const { temperature, magneticField, setTemperature, setMagneticField } = useExperimentStore();

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
          <ControlPanel
            temperature={temperature}
            magneticField={magneticField}
            onTemperatureChange={setTemperature}
            onMagneticFieldChange={setMagneticField}
          />
          <ExperimentChart temperature={temperature} magneticField={magneticField} />
        </div>
      </main>
    </div>
  );
}
