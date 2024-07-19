import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useOpenCategory } from "@/features/categories/hook/use-open-category";
import useConfirm from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type ActionsProps = {
  id: string;
};
export default function Actions({ id }: ActionsProps) {
  const { onOpen } = useOpenCategory();
  const deleteCategory = useDeleteCategory(id);
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Delete category",
    message: "Are you sure you want to delete this category?",
  });
  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onOpen(id)}
          >
            <Edit className="size-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={async () => {
              const isOk = await confirm();
              if (isOk) {
                deleteCategory.mutate({ id });
              }
            }}
          >
            <Trash className="size-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
