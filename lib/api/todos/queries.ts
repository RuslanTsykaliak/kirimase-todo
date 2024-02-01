import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type TodoId, todoIdSchema } from "@/lib/db/schema/todos";

export const getTodos = async () => {
  const { session } = await getUserAuth();
  const t = await db.todo.findMany({ where: {userId: session?.user.id!}});
  return { todos: t };
};

export const getTodoById = async (id: TodoId) => {
  const { session } = await getUserAuth();
  const { id: todoId } = todoIdSchema.parse({ id });
  const t = await db.todo.findFirst({
    where: { id: todoId, userId: session?.user.id!}});
  return { todo: t };
};

