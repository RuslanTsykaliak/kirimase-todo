import { Suspense } from "react";

import Loading from "@/app/loading";
import TodoList from "@/components/todos/TodoList";
import { getTodos } from "@/lib/api/todos/queries";

import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function TodosPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Todos</h1>
        </div>
        <Todos />
      </div>
    </main>
  );
}

const Todos = async () => {
  await checkAuth();

  const { todos } = await getTodos();
  
  return (
    <Suspense fallback={<Loading />}>
      <TodoList todos={todos}  />
    </Suspense>
  );
};
