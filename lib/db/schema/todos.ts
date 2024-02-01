import { todoSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getTodos } from "@/lib/api/todos/queries";


// Schema for todos - used to validate API requests
const baseSchema = todoSchema.omit(timestamps)

export const insertTodoSchema = baseSchema.omit({ id: true });
export const insertTodoParams = baseSchema.extend({
  completed: z.coerce.boolean()
}).omit({ 
  id: true,
  userId: true
});

export const updateTodoSchema = baseSchema;
export const updateTodoParams = updateTodoSchema.extend({
  completed: z.coerce.boolean()
}).omit({ 
  userId: true
});
export const todoIdSchema = baseSchema.pick({ id: true });

// Types for todos - used to type API request params and within Components
export type Todo = z.infer<typeof todoSchema>;
export type NewTodo = z.infer<typeof insertTodoSchema>;
export type NewTodoParams = z.infer<typeof insertTodoParams>;
export type UpdateTodoParams = z.infer<typeof updateTodoParams>;
export type TodoId = z.infer<typeof todoIdSchema>["id"];
    
// this type infers the return from getTodos() - meaning it will include any joins
export type CompleteTodo = Awaited<ReturnType<typeof getTodos>>["todos"][number];

