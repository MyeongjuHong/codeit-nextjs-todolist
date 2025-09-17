"use client";
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
      <h1>TODO LIST</h1>
      {todos.map((t) => {
        return (
          <div key={t.id}>
            {t.title}
            <button
              onClick={() => handleCheck(t)}
              className="text-green-500 border p-1 rounded-md m-2"
            >
              {t.isCompleted ? 'CANCEL' : 'DONE'}
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
  );
};

export default TodolistPage;
