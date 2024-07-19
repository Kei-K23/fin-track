import { db } from "@/db/drizzle";
import { categories, insertCategorySchema } from "@/db/schema";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth"
import { and, eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator"
import { createId } from "@paralleldrive/cuid2"
import { z } from "zod";

const app = new Hono()
    .get("/", clerkMiddleware(), async (c) => {
        const auth = getAuth(c);
        // If user is not authenticated
        if (!auth?.userId) {
            return c.json({
                error: "Unauthorize user"
            }, 401);
        }

        const data = await db.select({
            id: categories.id,
            name: categories.name
        }).from(categories).where(eq(categories.userId, auth.userId));

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
            id: categories.id,
            name: categories.name
        }).from(categories)
            .where(
                and(
                    eq(categories.id, id),
                    eq(categories.userId, auth.userId),
                )
            );

        if (!data) {
            return c.json({
                error: "Category not found"
            }, 404);
        }

        return c.json({ data });
    })
    .post("/", clerkMiddleware(), zValidator("json", insertCategorySchema.pick({
        name: true
    })), async (c) => {
        const auth = getAuth(c);
        const value = c.req.valid("json");
        // If user is not authenticated
        if (!auth?.userId) {
            return c.json({
                error: "Unauthorize user"
            }, 401);
        }

        const [data] = await db.insert(categories).values({
            id: createId(),
            userId: auth.userId,
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

        const data = await db.delete(categories).where(
            and(
                eq(categories.userId, auth.userId),
                inArray(categories.id, values.ids)
            )
        ).returning({
            id: categories.id,
        });

        return c.json({ data });
    })
    .patch("/:id", clerkMiddleware(), zValidator("param", z.object({
        id: z.string()
    })),
        zValidator("json", insertCategorySchema.pick({
            name: true
        }))
        , async (c) => {
            const auth = getAuth(c);
            const { id } = c.req.param();
            const { name } = c.req.valid("json");

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

            const [existingCategory] = await db.select({
                id: categories.id,
                name: categories.name
            }).from(categories)
                .where(
                    and(
                        eq(categories.id, id),
                        eq(categories.userId, auth.userId),
                    )
                );

            if (!existingCategory) {
                return c.json({
                    error: "Category not found to update"
                }, 404);
            }

            const [data] = await db.update(categories).set({
                name
            }).where(and(
                eq(categories.userId, auth.userId),
                eq(categories.id, id)
            )).returning();

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

        const [existingCategory] = await db.select({
            id: categories.id,
            name: categories.name
        }).from(categories)
            .where(
                and(
                    eq(categories.id, id),
                    eq(categories.userId, auth.userId),
                )
            );

        if (!existingCategory) {
            return c.json({
                error: "Category not found to delete"
            }, 404);
        }

        const [data] = await db.delete(categories).where(
            and(
                eq(categories.id, id),
                eq(categories.userId, auth.userId),
            )
        ).returning()

        return c.json({ data });
    })
    ;

export default app;