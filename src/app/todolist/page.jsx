"use client";
import React, { useEffect, useState } from "react";

const TodolistPage = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const response = await fetch("http://localhost:4000/todos");
      const data = await response.json();

      setList(data);
    };

    getList();
  }, []);

  const handleDone = async (id) => {
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      isCompleted: !e.target.isCompleted,
    });
    // FIXME: setData();
  };

  // FIXME: delte도 배워올 것.....

  return (
    <div>
      {list.map((t) => {
        return (
          <div key={t.id} className="flex gap-2 m-2">
            <span>{t.title}</span>
            <button
              className="border p-1 rounded-md"
              onClick={() => handleDone(t.id)}
            >
              {!t.isCompleted ? "Done" : "Cancel"}
            </button>
            <button className="border p-1 rounded-md">Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default TodolistPage;
