import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import ImportTable from "./import-table";

const inputDateFormat = "yyyy-MM-dd HH:mm:ss";
const outputDateFormat = "yyyy-MM-dd";
const requiredFields = ["amount", "date", "payee"];

interface SelectedColumnsState {
  [key: string]: string | null;
}

type ImportCardProps = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};

export default function ImportCard({
  data,
  onCancel,
  onSubmit,
}: ImportCardProps) {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {}
  );
  const header = data[0];
  const body = data.slice(1);

  const onTableHeaderSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import transaction
          </CardTitle>
          <div className="flex lg:flex-row flex-col gap-2">
            <Button onClick={onCancel}>
              <span>Cancel</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            header={header}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeaderSelectChange={onTableHeaderSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
