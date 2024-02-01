"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/todos/useOptimisticTodos";
import { type Todo } from "@/lib/db/schema/todos";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import TodoForm from "@/components/todos/TodoForm";


export default function OptimisticTodo({ 
  todo,
   
}: { 
  todo: Todo; 
  
  
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Todo) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticTodo, setOptimisticTodo] = useOptimistic(todo);
  const updateTodo: TAddOptimistic = (input) =>
    setOptimisticTodo({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <TodoForm
          todo={todo}
          
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateTodo}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{todo.description}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticTodo.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticTodo, null, 2)}
      </pre>
    </div>
  );
}
