"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateTodoPage = () => {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          isCompleted: false,
          createdAt: new Date(),
        }),
      });

      if (!res.ok) {
        throw new Error("submit api is failed");
      }

      alert("Created!");
      router.push("/todolist");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          value={title}
          onChange={handleChange}
          placeholder="CREATE TODO!"
          className="border rounded-md p-1"
        />
        <button className="border rounded-md p-1 text-blue-500">SUBMIT</button>
      </form>
    </div>
  );
};

export default CreateTodoPage;
