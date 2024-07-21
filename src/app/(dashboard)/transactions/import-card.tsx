import React from "react";

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
  return <div>import card</div>;
}
