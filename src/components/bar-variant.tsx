import { format } from "date-fns";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Bar,
} from "recharts";
import CustomChartTooltip from "./custom-chart-tooltip";

type BarVariantProps = {
  data: {
    date: string;
    income: number;
    expense: number;
  }[];
};

export default function BarVariant({ data }: BarVariantProps) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray={"3 3"} />
        <Tooltip content={<CustomChartTooltip />} />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={"date"}
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Bar
          dataKey={"income"}
          stroke="#3d82f6"
          fill="#3d82f6"
          className="drop-shadow-sm"
        />
        <Bar
          dataKey={"expense"}
          stroke="#f43f5e"
          fill="#f43f5e"
          className="drop-shadow-sm"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
