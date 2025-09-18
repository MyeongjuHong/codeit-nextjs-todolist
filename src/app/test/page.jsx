import React from "react";

const TestPage = () => {
  const fruits = ["banana", "berry", "grape"];

  console.log(fruits.map((el) => {
    return el+' map!';
  }))
  console.log(fruits);

  console.log(
    fruits.forEach((el) => {
      el + " forEach!";
    })
  );
  console.log(fruits);
  
  return (
    <div>
      {fruits.map((fruit) => {
        return <div>{fruit}</div>;
      })}
      {/* [<div>banana</div>, <div>berry</div>, <div>grape</div>] */}
      {fruits.forEach((fruit) => {
        <div>{fruit}</div>;
      })}
    </div>
  );
};

export default TestPage;
