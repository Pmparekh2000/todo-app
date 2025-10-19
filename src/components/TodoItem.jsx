import React from "react";

const TodoItem = ({
  todo = {},
  handleCompletedTask = () => {},
  handleRemoveTask = () => {},
}) => {
  return (
    <div className="single-todo-container">
      <div>
        {todo?.isCompleted ? (
          <span style={{ textDecoration: "line-through" }}>{todo?.title}</span>
        ) : (
          <span>{todo?.title}</span>
        )}
      </div>
      <div className="todo-action-buttons">
        <div onClick={() => handleCompletedTask(todo?.id)}>✔️</div>
        <div onClick={() => handleRemoveTask(todo?.id)}>❌</div>
      </div>
    </div>
  );
};

export default TodoItem;
