import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { getTodoById } from "@/lib/api/todos/queries";
import OptimisticTodo from "./OptimisticTodo";
import { checkAuth } from "@/lib/auth/utils";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function TodoPage({
  params,
}: {
  params: { todoId: string };
}) {

  return (
    <main className="overflow-auto">
      <Todo id={params.todoId} />
    </main>
  );
}

const Todo = async ({ id }: { id: string }) => {
  await checkAuth();

  const { todo } = await getTodoById(id);
  

  if (!todo) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <Button asChild variant="ghost">
          <Link href="/todos">
            <ChevronLeftIcon />
          </Link>
        </Button>
        <OptimisticTodo todo={todo}  />
      </div>
    </Suspense>
  );
};
