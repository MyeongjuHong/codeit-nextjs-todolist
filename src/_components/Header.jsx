import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between">
      Home
      <div className="flex gap-4">
        <Link href="/todolist">TODO LISTS</Link>
        <Link href="/new-todo">CREATE TODO</Link>
        <Link href="/status">STATUS</Link>
      </div>
    </div>
  );
};

export default Header;
