import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAccount = (id?: string) => {
    const query = useQuery({
        queryKey: ["accounts", { id }],
        queryFn: async () => {
            const response = await client.api.accounts[':id'].$get({
                param: { id }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch accounts");
            }

            const { data } = await response.json();

            return data;
        }
    });
    return query;
}