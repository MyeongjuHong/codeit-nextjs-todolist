import React from 'react'

const TodoPage = () => {
  const TODO_LIST = [
    { id: 1, title: "TODO1", isCompleted: true },
    { id: 2, title: "TODO2", isCompleted: false },
    { id: 3, title: "TODO3", isCompleted: true },
  ];

  const completedTodo = TODO_LIST.filter(function (todo) {
    if(todo.isCompleted) {
      return true;
    } else return false;
  })

  /* NOTE: 
    화면(ui)이 바뀌었다? = 스테이트가 바뀌었다
    리액트는 스테이트 변수의 '주소'값을 기억하고 있기 때문에, 변수 내부의 값을 바꿔도 리액트는 모름!
    그래서 setter 함수로 새 메모리 주소에 값을 할당하고 그 메모리주소를 업데이트해야 리액트가 변경을 감지하고 ui 리렌더링!
  */

  const incompletedTodo = TODO_LIST.filter(function (a) {
    if(!todo.isCompleted) {
      return true;
    } else return false;
  })

  return (
    <div>
      <h1>Completed!</h1>
      {completedTodo.map((el) => {
        return (
          <div>{el.title} | {el.isCompleted ? '완료' : '미완료'}</div>
        );
      })}
      <h1>Incompleted!</h1>
      {incompletedTodo.map((el) => {
        return (
          <div>{el.title} | {el.isCompleted ? '완료' : '미완료'}</div>
        );
      })}
      </div>
  )
}

export default TodoPage;