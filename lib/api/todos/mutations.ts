import { db } from "@/lib/db/index";
import { 
  TodoId, 
  NewTodoParams,
  UpdateTodoParams, 
  updateTodoSchema,
  insertTodoSchema, 
  todoIdSchema 
} from "@/lib/db/schema/todos";
import { getUserAuth } from "@/lib/auth/utils";

export const createTodo = async (todo: NewTodoParams) => {
  const { session } = await getUserAuth();
  const newTodo = insertTodoSchema.parse({ ...todo, userId: session?.user.id! });
  try {
    const t = await db.todo.create({ data: newTodo });
    return { todo: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTodo = async (id: TodoId, todo: UpdateTodoParams) => {
  const { session } = await getUserAuth();
  const { id: todoId } = todoIdSchema.parse({ id });
  const newTodo = updateTodoSchema.parse({ ...todo, userId: session?.user.id! });
  try {
    const t = await db.todo.update({ where: { id: todoId, userId: session?.user.id! }, data: newTodo})
    return { todo: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTodo = async (id: TodoId) => {
  const { session } = await getUserAuth();
  const { id: todoId } = todoIdSchema.parse({ id });
  try {
    const t = await db.todo.delete({ where: { id: todoId, userId: session?.user.id! }})
    return { todo: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

