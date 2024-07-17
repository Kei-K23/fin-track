import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth"
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator"
import { createId } from "@paralleldrive/cuid2"

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
            id: accounts.id,
            name: accounts.name
        }).from(accounts).where(eq(accounts.userId, auth.userId));

        return c.json({ data: data });
    })
    .post("/", clerkMiddleware(), zValidator("json", insertAccountSchema.pick({
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

        const [data] = await db.insert(accounts).values({
            id: createId(),
            userId: auth.userId,
            ...value
        }).returning();

        return c.json({ data });
    });

export default app;