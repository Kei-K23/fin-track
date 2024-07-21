import { format } from "date-fns";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Line,
} from "recharts";
import CustomChartTooltip from "./custom-chart-tooltip";

type LineVariantProps = {
  data: {
    date: string;
    income: number;
    expense: number;
  }[];
};

export default function LineVariant({ data }: LineVariantProps) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <LineChart data={data}>
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
        <Line
          dataKey={"income"}
          stroke="#3d82f6"
          strokeWidth={2}
          dot={false}
          className="drop-shadow-sm"
        />
        <Line
          dataKey={"expense"}
          stroke="#f43f5e"
          fill="#f43f5e"
          strokeWidth={2}
          dot={false}
          className="drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
