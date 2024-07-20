import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import CategoryCreateForm from "./category-create-form";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useNewCategory } from "../hook/use-new-category";
import { useCreateCategory } from "../api/use-create-category";

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export default function NewCategorySheet() {
  const { isOpen, onClose } = useNewCategory();
  const mutation = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Category</SheetTitle>
          <SheetDescription>Create a new category</SheetDescription>
        </SheetHeader>
        <CategoryCreateForm
          onSubmit={onSubmit}
          defaultValue={{ name: "" }}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
}
