import { Button } from "@/components/ui/button";
import { useOpenCategory } from "@/features/categories/hook/use-open-category";
import React from "react";

type CategoryColumnProps = {
  category: string | null;
  categoryId: string | null;
};
export default function CategoryColumn({
  category,
  categoryId,
}: CategoryColumnProps) {
  const { onOpen: onOpenCategory } = useOpenCategory();

  const onClick = () => {
    if (!categoryId) return;
    onOpenCategory(categoryId);
  };
  return (
    <Button onClick={onClick} variant={"link"}>
      {category}
    </Button>
  );
}
