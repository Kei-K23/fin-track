import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth"
import { eq } from "drizzle-orm";

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

        return c.json({
            data: data
        });
    });

export default app;