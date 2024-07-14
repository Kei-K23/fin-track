import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/hello', clerkMiddleware(), (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json({
            error: "Unauthorized"
        });
    }

    return c.json({
        userId: auth?.userId,
        message: 'Hello Next.js!',
    })
})
    .get('/hello/:id', zValidator("param", z.object({
        id: z.string(),
    })), (c) => {
        const { id } = c.req.param();
        return c.json({
            id,
            message: `Hello Next.js with ID: ${id}`,
        })
    })
    .post("/hello", async (c) => {
        const body = await c.req.json();
        return c.json({
            body,
            message: `Hello Next.js with body: ${JSON.stringify(body)}`,
        })
    })


export const GET = handle(app)
export const POST = handle(app)