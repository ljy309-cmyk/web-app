"use client";

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
import { generateResistanceData } from "@/lib/physics";

interface ExperimentChartProps {
  temperature: number;
  magneticField: number;
}

export default function ExperimentChart({ temperature, magneticField }: ExperimentChartProps) {
  const data = useMemo(() => generateResistanceData(magneticField), [magneticField]);

  return (
    <div className="rounded-lg bg-surface border border-border p-6">
      <h2 className="mb-2 text-lg font-semibold text-text-main">온도-저항 그래프</h2>
      <p className="mb-4 text-sm text-text-muted">
        현재 온도: <strong>{temperature}K</strong> / 자기장: <strong>{magneticField}T</strong>
      </p>
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
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
