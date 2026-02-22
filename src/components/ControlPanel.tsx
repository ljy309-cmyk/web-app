import styles from "./ControlPanel.module.css";

interface ControlPanelProps {
  temperature: number;
  magneticField: number;
  onTemperatureChange: (value: number) => void;
  onMagneticFieldChange: (value: number) => void;
}

function ControlPanel({
  temperature,
  magneticField,
  onTemperatureChange,
  onMagneticFieldChange,
}: ControlPanelProps) {
  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>실험 제어</h2>

      <div className={styles.control}>
        <label className={styles.label} htmlFor="temperature">
          온도 (K)
        </label>
        <input
          id="temperature"
          className={styles.slider}
          type="range"
          min={0}
          max={400}
          step={1}
          value={temperature}
          onChange={(e) => onTemperatureChange(Number(e.target.value))}
        />
        <span className={styles.value}>{temperature} K</span>
      </div>

      <div className={styles.control}>
        <label className={styles.label} htmlFor="magneticField">
          자기장 (T)
        </label>
        <input
          id="magneticField"
          className={styles.slider}
          type="range"
          min={0}
          max={20}
          step={0.1}
          value={magneticField}
          onChange={(e) => onMagneticFieldChange(Number(e.target.value))}
        />
        <span className={styles.value}>{magneticField.toFixed(1)} T</span>
      </div>

      <div className={styles.info}>
        <h3 className={styles.infoTitle}>상태 정보</h3>
        <p className={styles.infoText}>
          {temperature < 92
            ? "초전도 상태: 저항이 0에 근접합니다."
            : "일반 상태: 온도가 임계점 이상입니다."}
        </p>
      </div>
    </div>
  );
}

export default ControlPanel;
