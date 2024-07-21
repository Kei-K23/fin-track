import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import TableHeadSelect from "./table-head-select";

type ImportTableProps = {
  header: string[];
  body: string[][];
  selectedColumns: Record<string, string | null>;
  onTableHeaderSelectChange: (
    columnIndex: number,
    value: string | null
  ) => void;
};

const requiredFields = ["amount", "date", "payee"];

export default function ImportTable({
  header,
  body,
  selectedColumns,
  onTableHeaderSelectChange,
}: ImportTableProps) {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {header.map((_item, index) => (
              <TableHead key={index}>
                <TableHeadSelect
                  columnIndex={index}
                  selectedColumns={selectedColumns}
                  onChange={onTableHeaderSelectChange}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row: string[], index) => (
            <TableRow key={index}>
              {row.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
