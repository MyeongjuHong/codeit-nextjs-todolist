"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const TodoItemPage = () => {
  const [item, setItem] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getItem = async () => {
      const response = await fetch(`http://localhost:4000/todos/${id}`);
      const item = await response.json();
      setItem(item);
    };

    getItem();
  }, []);
  console.log(item);
  return (
    <div>
      <div>[ TITLE ] {item.title}</div>
      <div>[ DETAILS ] {item.desc}</div>
      <div>[ CHECK ] {item.isCompleted ? '⭕️' : '❌'}</div>
    </div>
  );
};

export default TodoItemPage;
