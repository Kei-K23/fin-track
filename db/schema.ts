import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const accounts = pgTable("accounts", {
    id: serial('id').primaryKey(),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
});