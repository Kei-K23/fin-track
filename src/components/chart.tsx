import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FileSearch } from "lucide-react";
import AreaVariant from "./area-variant";

type ChartProps = {
  data?: {
    date: string;
    income: number;
    expense: number;
  }[];
};

export default function Chart({ data = [] }: ChartProps) {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
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
          <AreaVariant data={data} />
        )}
      </CardContent>
    </Card>
  );
}
