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
import useConfirm from "@/hooks/use-confirm";
import { useOpenCategory } from "../hook/use-open-category";
import { useEditCategory } from "../api/use-edit-category";
import { useGetCategory } from "../api/use-get-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { Loader2 } from "lucide-react";

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export default function EditCategorySheet() {
  const { isOpen, onClose, id } = useOpenCategory();
  const mutation = useEditCategory(id);
  const getCategory = useGetCategory(id);
  const deleteCategory = useDeleteCategory(id);
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Delete category",
    message: "Are you sure you want to delete this category?",
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const isOk = await confirm();
    if (isOk) {
      deleteCategory.mutate(
        { id },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  const isDisabled = getCategory.isLoading || deleteCategory.isPaused;

  const defaultValue = getCategory.data
    ? {
        name: getCategory.data.name,
      }
    : {
        name: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>
              Edit or delete an existing category
            </SheetDescription>
          </SheetHeader>
          {isDisabled ? (
            <div className="absolute inset-0 flex justify-center items-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryCreateForm
              id={getCategory.data?.id}
              onSubmit={onSubmit}
              defaultValue={defaultValue}
              disabled={isDisabled}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
