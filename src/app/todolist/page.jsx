"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TodolistPage = () => {
  const [todos, setTodos] = useState([]);

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

  useEffect(() => {
    const getLists = async () => {
      const res = await fetch("http://localhost:4000/todos");
      const data = await res.json();

      setTodos(data);
    };

    getLists();
  }, []);
  return (
    <div>
      <h1>[ TODO LIST ]</h1>
      <form className="flex gap-2">
        <input
          placeholder="검색어를 입력하세요"
          className="p-1 border rounded-md"
        />
        <button className="text-blue-500 border p-1 rounded-md">SEARCH</button>
      </form>
      <div className="flex flex-col">
        {todos.map((t) => {
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
