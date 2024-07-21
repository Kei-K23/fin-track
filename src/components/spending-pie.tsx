import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FileSearch, Loader2, PieChart, Radar, Target } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import PieVariant from "./pie-variant";
import RadarVariant from "./radar-variant";
import RadialVariant from "./radial-variant";
import { Skeleton } from "./ui/skeleton";

type SpendingPieProps = {
  data?: {
    name: string;
    value: number;
  }[];
};

enum PieType {
  PIE = "PIE",
  RADAR = "RADAR",
  RADIAL = "RADIAL",
}

export default function SpendingPie({ data = [] }: SpendingPieProps) {
  const [chartType, setChartType] = useState<PieType>(PieType.PIE);

  const onTypeChange = (type: PieType) => {
    setChartType(type);
  };

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Pie type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={PieType.PIE}>
              <div className="flex items-center gap-1">
                <PieChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Pie chart</p>
              </div>
            </SelectItem>
            <SelectItem value={PieType.RADAR}>
              <div className="flex items-center gap-1">
                <Radar className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radar chart</p>
              </div>
            </SelectItem>
            <SelectItem value={PieType.RADIAL}>
              <div className="flex items-center gap-1">
                <Target className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radial chart</p>
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
            {chartType === PieType.PIE && <PieVariant data={data} />}
            {chartType === PieType.RADAR && <RadarVariant data={data} />}
            {chartType === PieType.RADIAL && <RadialVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export const SpendingPieLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 lg:w-[120px] w-full" />
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full flex justify-center items-center">
          <Loader2 className="size-6 text-slate-300 animate-spin" />
        </div>
      </CardContent>
    </Card>
  );
};
