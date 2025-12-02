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
import { CHART_COLORS } from "@/lib/mock-comparison-data";

interface ComparisonLineChartProps {
  data: any[];
  dataKeys: { key: string; name: string; color: string }[];
  yAxisLabel?: string;
  height?: number;
}

export const ComparisonLineChart = ({
  data,
  dataKeys,
  yAxisLabel = "",
  height = 300,
}: ComparisonLineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        className="transition-all duration-500 ease-in-out"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="period"
          stroke="hsl(var(--foreground))"
          style={{ fontSize: "12px" }}
        />
        <YAxis
          stroke="hsl(var(--foreground))"
          style={{ fontSize: "12px" }}
          label={{
            value: yAxisLabel,
            angle: -90,
            position: "insideLeft",
            style: { fontSize: "12px", fill: "hsl(var(--foreground))" },
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            padding: "8px",
          }}
          labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
        />
        <Legend
          wrapperStyle={{ fontSize: "12px" }}
          iconType="line"
        />
        {dataKeys.map((item, index) => (
          <Line
            key={item.key}
            type="monotone"
            dataKey={item.key}
            name={item.name}
            stroke={item.color || CHART_COLORS[index % CHART_COLORS.length]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
