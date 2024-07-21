import {
  ResponsiveContainer,
  Pie,
  RadarChart,
  Legend,
  Cell,
  Tooltip,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import CustomSpendingPieTooltip from "./custom-spending-pit-chart-tooltip";

type RadarVariantProps = {
  data: {
    name: string;
    value: number;
  }[];
};

export default function RadarVariant({ data }: RadarVariantProps) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <RadarChart cx={"50%"} cy={"50%"} outerRadius={"60%"} data={data}>
        <Tooltip content={<CustomSpendingPieTooltip />} />
        <PolarGrid />
        <PolarAngleAxis style={{ fontSize: "12px" }} dataKey={"name"} />
        <PolarRadiusAxis style={{ fontSize: "12px" }} />
        <Radar
          dataKey={"value"}
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
