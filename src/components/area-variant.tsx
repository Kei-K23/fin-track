import { format } from "date-fns";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  Area,
} from "recharts";

type AreaVariantProps = {
  data: {
    date: string;
    income: number;
    expense: number;
  }[];
};

export default function AreaVariant({ data }: AreaVariantProps) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray={"3 3"} />
        <defs>
          <linearGradient id="income" x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
            <stop offset={"2%"} stopColor="#3d82f6" stopOpacity={0.8} />
            <stop offset={"98%"} stopColor="#3d82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="income" x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
            <stop offset={"2%"} stopColor="#f43f5e" stopOpacity={0.8} />
            <stop offset={"98%"} stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={"date"}
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Area
          type={"monotone"}
          dataKey={"income"}
          stackId={"income"}
          strokeWidth={2}
          stroke="#3d82f6"
          fill="url(#income)"
          className="drop-shadow-sm"
        />
        <Area
          type={"monotone"}
          dataKey={"expense"}
          stackId={"expense"}
          strokeWidth={2}
          stroke="#f43f5e"
          fill="url(#expense)"
          className="drop-shadow-sm"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
