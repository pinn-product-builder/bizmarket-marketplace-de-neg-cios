import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CHART_COLORS } from "@/lib/mock-comparison-data";

interface ComparisonRadarChartProps {
  data: any[];
  dataKeys: { key: string; name: string; color: string }[];
  height?: number;
}

export const ComparisonRadarChart = ({
  data,
  dataKeys,
  height = 400,
}: ComparisonRadarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} className="transition-all duration-500 ease-in-out">
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis
          dataKey="metric"
          stroke="hsl(var(--foreground))"
          style={{ fontSize: "12px" }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: "10px" }}
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
          iconType="circle"
        />
        {dataKeys.map((item, index) => (
          <Radar
            key={item.key}
            name={item.name}
            dataKey={item.key}
            stroke={item.color || CHART_COLORS[index % CHART_COLORS.length]}
            fill={item.color || CHART_COLORS[index % CHART_COLORS.length]}
            fillOpacity={0.25}
            strokeWidth={2}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
};
