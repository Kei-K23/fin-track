import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import React from "react";
import { useCSVReader } from "react-papaparse";

type UploadButtonProps = {
  onUpload: (results: any) => void;
};

export default function UploadButton({ onUpload }: UploadButtonProps) {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button {...getRootProps()}>
          <Upload className="size-4 mr-2" />
          <span>Import</span>
        </Button>
      )}
    </CSVReader>
  );
}
