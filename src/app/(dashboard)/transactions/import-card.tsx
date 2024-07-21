import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import ImportTable from "./import-table";
import { convertAmountToMiliUnits } from "@/lib/utils";
import { format, parse } from "date-fns";

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

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleOnContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };

    const mappedData = {
      headers: header.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);

        return selectedColumns[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row) => {
          const transformRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });
          return transformRow.every((item) => item === null)
            ? []
            : transformRow;
        })
        .filter((row) => row.length > 0),
    };

    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index];
        if (header !== null) {
          acc[header] = cell;
        }

        return acc;
      }, {});
    });

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountToMiliUnits(parseFloat(item.amount)),
      date: format(
        parse(item.date, inputDateFormat, new Date()),
        outputDateFormat
      ),
    }));

    onSubmit(formattedData);
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
            <Button
              onClick={handleOnContinue}
              disabled={progress < requiredFields.length}
            >
              <span>
                Continue ({progress} / {requiredFields.length})
              </span>
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
