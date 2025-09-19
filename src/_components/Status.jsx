"use client";

import React, { useEffect, useState } from "react";

const Status = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch("http://localhost:4000/todos");
        const data = await res.json();

        setTodos(data);
      } catch (err) {
        console.error(err);
      }
    };

    getTodos();
  }, []);

  const completedTodos = todos.filter((todo) => todo.isCompleted);
  return (
    <div>
      <div>[ StatusPage ]</div>
      <div>TOTAL: {todos.length}</div>
      <div>DONE: {completedTodos.length}</div>
      <div>NOT YET: {todos.length - completedTodos.length}</div>
    </div>
  );
};

export default Status;
