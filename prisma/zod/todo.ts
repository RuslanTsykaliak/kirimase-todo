import * as z from "zod"

export const todoSchema = z.object({
  id: z.string(),
  description: z.string(),
  completed: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
