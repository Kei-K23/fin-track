import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "@/lib/hono"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;
type RequestType = InferRequestType<typeof client.api.categories[":id"]["$delete"]>["param"];

export const useDeleteCategory = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async () => {
            const response = await client.api.categories[":id"]["$delete"]({
                param: {
                    id
                }
            })
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Category deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["categories", { id }] });
        },
        onError: () => {
            toast.error("Could not delete the category");
        }
    });

    return mutation;
}