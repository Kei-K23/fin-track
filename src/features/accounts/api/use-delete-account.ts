import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "@/lib/hono"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>;
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$delete"]>["param"];

export const useDeleteAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async () => {
            const response = await client.api.accounts[":id"]["$delete"]({
                param: {
                    id
                }
            })
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            queryClient.invalidateQueries({ queryKey: ["accounts", { id }] });
        },
        onError: () => {
            toast.error("Could not delete the account");
        }
    });

    return mutation;
}