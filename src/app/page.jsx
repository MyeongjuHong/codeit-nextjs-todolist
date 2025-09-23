"use client";

import { useEffect, useState } from "react";
import TodoList from "./_components/TodoList";
import { fetchTodos } from "@/api/todos";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadTodos = async () => {
    const data = await fetchTodos();
    setTodos(data);
  };

  useEffect(() => {
    try {
      setIsError(false);
      setIsLoading(true);
      loadTodos();
    } catch (err) {
      setIsError(true);
      console.error(err); // REVIEW: 또 console.error로 찍는게 맞나?
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <>Loading . . .</>;
  }

  if (isError) {
    return <>Check error using console</>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">투두리스트</h1>
      <div className="max-w-md mx-auto mt-8">
        {/* <TodoForm loadTodos={loadTodos} /> */}
        <h2 className="text-2xl font-bold mb-4">할 일 목록</h2>
        <TodoList todos={todos} />
      </div>
    </div>
  );
}
