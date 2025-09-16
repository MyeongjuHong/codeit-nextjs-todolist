import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between p-4">
      <Link href="/">Home</Link>
      <nav className="flex gap-4">
        <Link href="todolist"> 할 일 리스트</Link>
        {/* <Link href={`/todolist/${id}`}>할 일 상세</Link> */}
        {/* FIXME: id 해결 */}
        <Link href="newtodo">새 할 일 추가</Link>
      </nav>
    </div>
  );
};

export default Header;
