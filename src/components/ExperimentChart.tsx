import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { generateResistanceData } from "../utils/physics";
import styles from "./ExperimentChart.module.css";

interface ExperimentChartProps {
  temperature: number;
  magneticField: number;
}

function ExperimentChart({ temperature, magneticField }: ExperimentChartProps) {
  const data = useMemo(() => generateResistanceData(magneticField), [magneticField]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>온도-저항 그래프</h2>
      <p className={styles.description}>
        현재 온도: <strong>{temperature}K</strong> / 자기장: <strong>{magneticField}T</strong>
      </p>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
            <XAxis
              dataKey="temp"
              label={{ value: "온도 (K)", position: "insideBottom", offset: -5 }}
              stroke="#a0a0b0"
            />
            <YAxis
              label={{ value: "저항 (Ω)", angle: -90, position: "insideLeft" }}
              stroke="#a0a0b0"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#16213e",
                border: "1px solid #2a2a4a",
                borderRadius: "4px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="resistance"
              name="저항"
              stroke="#f55575"
              strokeWidth={2}
              dot={false}
              animationDuration={300}
            />
            <Line
              type="monotone"
              dataKey="superconducting"
              name="초전도 상태"
              stroke="#4ade80"
              strokeWidth={2}
              dot={false}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExperimentChart;
