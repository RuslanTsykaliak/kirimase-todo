import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createTodo,
  deleteTodo,
  updateTodo,
} from "@/lib/api/todos/mutations";
import { 
  todoIdSchema,
  insertTodoParams,
  updateTodoParams 
} from "@/lib/db/schema/todos";

export async function POST(req: Request) {
  try {
    const validatedData = insertTodoParams.parse(await req.json());
    const { todo } = await createTodo(validatedData);

    revalidatePath("/todos"); // optional - assumes you will have named route same as entity

    return NextResponse.json(todo, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateTodoParams.parse(await req.json());
    const validatedParams = todoIdSchema.parse({ id });

    const { todo } = await updateTodo(validatedParams.id, validatedData);

    return NextResponse.json(todo, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = todoIdSchema.parse({ id });
    const { todo } = await deleteTodo(validatedParams.id);

    return NextResponse.json(todo, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
