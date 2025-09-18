"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TodolistPage = () => {
  const [todos, setTodos] = useState([]);
  const [keyword, setKeyword] = useState("");

  const handleCheck = async ({ id, isCompleted }) => {
    // const handleCheck = async (a) => {
    console.log("a => ", id, isCompleted);
    // console.log(id, isCompleted);
    try {
      const res = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isCompleted: !isCompleted,
        }),
      });

      if (!res.ok) {
        throw new Error("handle check api is failed");
      }

      setTodos((prev) => {
        return prev.map((t) => {
          if (t.id === id) {
            return { ...t, isCompleted: !isCompleted };
          } else {
            return t; // NOTE: 이거 없으면 바뀌지 않는 데이터는 undefined가 됨!!
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async ({ id }) => {
    try {
      const res = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("handle delete api is failed");
      }

      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // const handleSearchChange = async (e) => {
  //   setTodos((prev) =>
  //     prev.filter((todo) => todo.title.includes(e.target.value))
  //   );
  // }; // 오답노트: 원본 todos 변경으로 검색어를 지워도 원래의 전체 목록으로 돌아갈 수 없음 => 처음부터 원본 todo에서 keyword로 filtering한 목록을 map해야함

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  }; // 오답노트: 값이 바뀔 때마다 원본 배열을 직접 바꾸는게 아닌, keyword를 바꾸고, 그거로 filter한 배열을 출력시켜야 함

  useEffect(() => {
    const getLists = async () => {
      const res = await fetch("http://localhost:4000/todos");
      const data = await res.json();

      setTodos(data);
    };

    getLists();
  }, []);

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(keyword.toLowerCase()) // 오답노트: todo.title로 해야지!
  ); // 오답노트: 순전히 데이터를 필터링한 값으로 사용

  return (
    <div>
      <h1>[ TODO LIST ]</h1>
      <form className="flex gap-2">
        <input
          placeholder="검색어를 입력하세요"
          className="p-1 border rounded-md"
          onChange={handleSearchChange}
        />
        <button className="text-blue-500 border p-1 rounded-md">SEARCH</button>
      </form>
      <div className="flex flex-col">
        {filteredTodos.map((t) => {
          return (
            <div key={t.id} className="flex items-center gap-4">
              <Link
                href={`todolist/${t.id}`}
                className="text-pink-500 border p-2 rounded-md"
              >
                Details
              </Link>
              {t.title}
              <button
                onClick={() => handleCheck(t)}
                className="text-green-500 border p-1 rounded-md"
              >
                {t.isCompleted ? "CANCEL" : "DONE"}
              </button>
              <button
                onClick={() => handleDelete(t)}
                className="text-red-500 border p-1 rounded-md"
              >
                DELETE
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodolistPage;
