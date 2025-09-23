"use client";

import { useEffect, useState } from "react";
import TodoList from "./_components/TodoList";
import { fetchTodos } from "@/api/todos";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const loadTodos = async () => {
    const data = await fetchTodos();
    setTodos(data);
  };

  const {
    data: todos, // NOTE: queryFn(loadTodos) return값을 data 속성에 넣음
    isPending: isLoading,
    isError,
  } = useQuery({
    // NOTE: key가 없으면 새로 등록 & 함수 매핑해 실행, 있으면 기존 함수 실행
    queryKey: ["todos"], // NOTE: 고유 키. 다른 함수 실행할 때만 겹치지 않으면 됨 (겹쳐도 기존에 등록된 함수 실행)
    queryFn: loadTodos, // NOTE: 함수 매핑
  });

  if (isLoading) {
    return <>Loading . . .</>;
  }

  if (isError) {
    return <>Check error using console</>;
  }

  // NOTE: useState와 useEffect가 사용되지 않는다! (Providers에 있는 state는 서버 상태 전역 관리용이니까 제외하고)

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
