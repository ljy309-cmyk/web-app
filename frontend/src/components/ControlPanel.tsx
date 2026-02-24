import { getCriticalTemperature } from "@/lib/physics";

interface ControlPanelProps {
  temperature: number;
  magneticField: number;
  onTemperatureChange: (value: number) => void;
  onMagneticFieldChange: (value: number) => void;
}

export default function ControlPanel({
  temperature,
  magneticField,
  onTemperatureChange,
  onMagneticFieldChange,
}: ControlPanelProps) {
  const tc = getCriticalTemperature(magneticField);

  return (
    <div className="rounded-lg bg-surface border border-border p-6">
      <h2 className="mb-6 text-lg font-semibold text-text-main">실험 제어</h2>

      <div className="mb-6">
        <label htmlFor="temperature" className="mb-2 block text-sm text-text-muted">
          온도 (K)
        </label>
        <input
          id="temperature"
          className="w-full accent-accent"
          type="range"
          min={0}
          max={400}
          step={1}
          value={temperature}
          onChange={(e) => onTemperatureChange(Number(e.target.value))}
        />
        <span className="mt-1 block text-right text-sm font-mono text-text-main">
          {temperature} K
        </span>
      </div>

      <div className="mb-6">
        <label htmlFor="magneticField" className="mb-2 block text-sm text-text-muted">
          자기장 (T)
        </label>
        <input
          id="magneticField"
          className="w-full accent-accent"
          type="range"
          min={0}
          max={20}
          step={0.1}
          value={magneticField}
          onChange={(e) => onMagneticFieldChange(Number(e.target.value))}
        />
        <span className="mt-1 block text-right text-sm font-mono text-text-main">
          {magneticField.toFixed(1)} T
        </span>
      </div>

      <div className="rounded-lg bg-primary/30 p-4">
        <h3 className="mb-2 text-sm font-semibold text-text-main">상태 정보</h3>
        <p className="text-sm text-text-muted">
          {temperature < tc
            ? "초전도 상태: 저항이 0에 근접합니다."
            : "일반 상태: 온도가 임계점 이상입니다."}
        </p>
        <p className="mt-1 text-xs text-text-muted">임계온도: {tc.toFixed(1)} K</p>
      </div>
    </div>
  );
}
