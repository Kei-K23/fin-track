import { Button } from "@/components/ui/button";
import { useOpenCategory } from "@/features/categories/hook/use-open-category";
import { useOpenTransaction } from "@/features/transactions/hook/use-open-transaction";
import { AlertTriangle, FileWarning, MessageSquareWarning } from "lucide-react";
import React from "react";

type CategoryColumnProps = {
  id: string;
  category: string | null;
  categoryId: string | null;
};
export default function CategoryColumn({
  id,
  category,
  categoryId,
}: CategoryColumnProps) {
  const { onOpen: onOpenCategory } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();
  const onClick = () => {
    if (!categoryId) {
      onOpenTransaction(id);
    } else {
      onOpenCategory(categoryId);
    }
  };
  return (
    <Button onClick={onClick} variant={"link"} className="">
      {category ? (
        category
      ) : (
        <div className="flex items-center text-red-500">
          <AlertTriangle className="size-5 mr-2 text-rose-500" /> No category
        </div>
      )}
    </Button>
  );
}
