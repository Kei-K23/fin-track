import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useOpenAccount } from "@/features/accounts/hook/use-open-account";
import useConfirm from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type ActionsProps = {
  id: string;
};
export default function Actions({ id }: ActionsProps) {
  const { onOpen } = useOpenAccount();
  const deleteAccount = useDeleteAccount(id);
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Delete account",
    message: "Are you sure you want to delete this account?",
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
                deleteAccount.mutate({ id });
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
