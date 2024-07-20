import { db } from "@/db/drizzle";
import { accounts, categories, insertAccountSchema, insertTransactionSchema, transactions } from "@/db/schema";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth"
import { and, desc, eq, gte, inArray, lte, sql } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator"
import { createId } from "@paralleldrive/cuid2"
import { z } from "zod";
import { parse, subDays } from "date-fns"

const app = new Hono()
    .get("/", clerkMiddleware(), zValidator("query", z.object({
        from: z.string().optional(),
        to: z.string().optional(),
        accountId: z.string().optional(),
    })), async (c) => {
        const auth = getAuth(c);
        const { from, to, accountId } = c.req.valid("query");
        // If user is not authenticated
        if (!auth?.userId) {
            return c.json({
                error: "Unauthorize user"
            }, 401);
        }

        const defaultTo = new Date();
        const defaultFrom = subDays(defaultTo, 30);

        const startDate = from ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom;

        const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

        const data = await db.select({
            id: transactions.id,
            categoryId: transactions.categoryId,
            accountId: transactions.accountId,
            payee: transactions.payee,
            amount: transactions.amount,
            notes: transactions.notes,
            date: transactions.date
        }).from(transactions)
            .innerJoin(accounts, eq(transactions.accountId, accounts.id))
            .leftJoin(categories, eq(transactions.categoryId, categories.id))
            .where(
                and(
                    accountId ? eq(transactions.accountId, accountId) : undefined,
                    eq(accounts.userId, auth.userId),
                    gte(transactions.date, startDate),
                    lte(transactions.date, endDate)
                )
            )
            .orderBy(desc(transactions.date));

        return c.json({ data: data });
    })
    .get("/:id", clerkMiddleware(), zValidator("param", z.object({
        id: z.string()
    })), async (c) => {
        const auth = getAuth(c);
        const { id } = c.req.param();

        if (!id) {
            return c.json({
                error: "Missing id parameter"
            }, 400);
        }
        // If user is not authenticated
        if (!auth?.userId) {
            return c.json({
                error: "Unauthorize user"
            }, 401);
        }

        const [data] = await db.select({
            id: transactions.id,
            categoryId: transactions.categoryId,
            accountId: transactions.accountId,
            payee: transactions.payee,
            amount: transactions.amount,
            notes: transactions.notes,
            date: transactions.date
        }).from(transactions)
            .innerJoin(accounts, eq(transactions.accountId, accounts.id))
            .where(
                and(
                    eq(transactions.id, id),
                    eq(accounts.userId, auth.userId),
                )
            );

        if (!data) {
            return c.json({
                error: "Transaction not found"
            }, 404);
        }

        return c.json({ data });
    })
    .post("/", clerkMiddleware(), zValidator("json", insertTransactionSchema.omit({
        id: true
    })), async (c) => {
        const auth = getAuth(c);
        const value = c.req.valid("json");
        // If user is not authenticated
        if (!auth?.userId) {
            return c.json({
                error: "Unauthorize user"
            }, 401);
        }

        const [data] = await db.insert(transactions).values({
            id: createId(),
            ...value
        }).returning();

        return c.json({ data });
    })
    .post("/bulk-delete", clerkMiddleware(), zValidator("json", z.object({
        ids: z.array(z.string().min(1))
    })), async (c) => {
        const auth = getAuth(c);
        const values = c.req.valid("json");
        // If user is not authenticated
        if (!auth?.userId) {
            return c.json({
                error: "Unauthorize user"
            }, 401);
        }

        const transactionsToDelete = db.$with("transactions_to_delete").as(
            db.select({ id: transactions.id }).from(transactions)
                .innerJoin(accounts, eq(transactions.accountId, accounts.id))
                .where(
                    and(
                        inArray(transactions.id, values.ids),
                        eq(accounts.userId, auth.userId)
                    )
                )
        );

        const data = await db.with(transactionsToDelete)
            .delete(transactions)
            .where(and(
                inArray(transactions.id, sql`SELECT id from ${transactionsToDelete}`),
            ))
            .returning({
                id: transactions.id
            });

        return c.json({ data });
    })
    .patch("/:id", clerkMiddleware(), zValidator("param", z.object({
        id: z.string()
    })),
        zValidator("json", insertTransactionSchema.omit({
            id: true
        }))
        , async (c) => {
            const auth = getAuth(c);
            const { id } = c.req.param();
            const values = c.req.valid("json");

            if (!id) {
                return c.json({
                    error: "Missing id parameter"
                }, 400);
            }
            // If user is not authenticated
            if (!auth?.userId) {
                return c.json({
                    error: "Unauthorize user"
                }, 401);
            }

            const transactionToUpdate = db.$with("transaction_to_update").as(
                db.select({ id: transactions.id }).from(transactions)
                    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
                    .where(
                        and(
                            eq(transactions.id, id),
                            eq(accounts.userId, auth.userId)
                        )
                    )
            );

            const [data] = await db.with(transactionToUpdate).update(transactions).set(values).where(and(
                eq(accounts.userId, auth.userId),
                eq(transactions.id, id)
            )).returning();

            if (!data) {
                return c.json({
                    error: "Transaction not found to update"
                }, 404);
            }

            return c.json({ data });
        })
    .delete("/:id", clerkMiddleware(), zValidator("param", z.object({
        id: z.string()
    })), async (c) => {
        const auth = getAuth(c);
        const { id } = c.req.param();

        if (!id) {
            return c.json({
                error: "Missing id parameter"
            }, 400);
        }
        // If user is not authenticated
        if (!auth?.userId) {
            return c.json({
                error: "Unauthorize user"
            }, 401);
        }


        const transactionToDelete = db.$with("transaction_to_delete").as(
            db.select({ id: transactions.id }).from(transactions)
                .innerJoin(accounts, eq(transactions.accountId, accounts.id))
                .where(
                    and(
                        eq(transactions.id, id),
                        eq(accounts.userId, auth.userId)
                    )
                )
        );


        const [data] = await db.with(transactionToDelete).delete(accounts).where(
            and(
                eq(accounts.id, id),
                eq(accounts.userId, auth.userId),
            )
        ).returning();

        if (!data) {
            return c.json({
                error: "Transaction not found to delete"
            }, 404);
        }

        return c.json({ data });
    })
    ;

export default app;