import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "@/lib/hono"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>;
type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$delete"]>["param"];

export const useDeleteTransaction = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async () => {
            const response = await client.api.transactions[":id"]["$delete"]({
                param: {
                    id
                }
            })
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Transaction deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["transactions", { id }] });
        },
        onError: () => {
            toast.error("Could not delete the transaction");
        }
    });

    return mutation;
}