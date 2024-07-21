import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AreaChart, BarChart, FileSearch, LineChart } from "lucide-react";
import AreaVariant from "./area-variant";
import BarVariant from "./bar-variant";
import LineVariant from "./line-variant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type ChartProps = {
  data?: {
    date: string;
    income: number;
    expense: number;
  }[];
};

enum ChartType {
  AREA = "AREA",
  BAR = "BAR",
  LINE = "LINE",
}

export default function Chart({ data = [] }: ChartProps) {
  const [chartType, setChartType] = useState<ChartType>(ChartType.AREA);

  const onTypeChange = (type: ChartType) => {
    setChartType(type);
  };

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ChartType.AREA}>
              <div className="flex items-center gap-1">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Area chart</p>
              </div>
            </SelectItem>
            <SelectItem value={ChartType.BAR}>
              <div className="flex items-center gap-1">
                <BarChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Bar chart</p>
              </div>
            </SelectItem>
            <SelectItem value={ChartType.LINE}>
              <div className="flex items-center gap-1">
                <LineChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Line chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No data for this period
            </p>
          </div>
        ) : (
          <>
            {chartType === ChartType.AREA && <AreaVariant data={data} />}
            {chartType === ChartType.BAR && <BarVariant data={data} />}
            {chartType === ChartType.LINE && <LineVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
}
