import { client } from "@/lib/hono";
import { convertAmountFromMiliUnits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetSummary = () => {
    const params = useSearchParams();
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId") || "";

    const query = useQuery({
        // TODO : Check when unique data need or not
        queryKey: ["transactions"],
        queryFn: async () => {

            const response = await client.api.summary.$get({
                query: {
                    from,
                    to,
                    accountId
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch transactions");
            }

            const { data } = await response.json();

            return {
                ...data,
                incomeAmount: convertAmountFromMiliUnits(data.incomeAmount),
                expenseAmount: convertAmountFromMiliUnits(data.expenseAmount),
                remainingAmount: convertAmountFromMiliUnits(data.remainingAmount),
                categories: data.categories.map((c) => ({
                    ...c,
                    value: convertAmountFromMiliUnits(c.value)
                })),
                days: data.days.map(d => ({
                    ...d,
                    income: convertAmountFromMiliUnits(d.income),
                    expense: convertAmountFromMiliUnits(d.expense)
                }))
            };
        }
    });
    return query;
}