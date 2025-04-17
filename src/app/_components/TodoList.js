"use client";

import { useState, useEffect } from "react";
import TodoItem from "@/app/_components/TodoItem";
import { fetchTodos } from "@/api/todos";

export default function TodoList({ todos }) {
  return (
    <div className="border">
      {todos.length === 0 ? (
        <div className="p-4 text-center">할 일이 없습니다.</div>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
}
