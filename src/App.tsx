import { useState } from "react";
import Header from "./components/Header";
import ExperimentChart from "./components/ExperimentChart";
import ControlPanel from "./components/ControlPanel";
import styles from "./App.module.css";

function App() {
  const [temperature, setTemperature] = useState(300);
  const [magneticField, setMagneticField] = useState(0);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <section className={styles.chartSection}>
            <ExperimentChart
              temperature={temperature}
              magneticField={magneticField}
            />
          </section>
          <aside className={styles.controlSection}>
            <ControlPanel
              temperature={temperature}
              magneticField={magneticField}
              onTemperatureChange={setTemperature}
              onMagneticFieldChange={setMagneticField}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
