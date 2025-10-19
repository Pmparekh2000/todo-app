import React, { useState } from "react";

const TodoItem = ({
  todo = {},
  handleCompletedTask = () => {},
  handleRemoveTask = () => {},
  hadleEditTask = () => {},
}) => {
  const [showEditInput, setShowEditInput] = useState(false);
  const [udpatedValue, setUpdatedValue] = useState(todo.title);

  console.log("Rendering from child TodoItem component");

  return (
    <div className="single-todo-container">
      <div>
        {showEditInput ? (
          <input
            type="text"
            value={udpatedValue}
            onChange={(e) => setUpdatedValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                hadleEditTask(todo?.id, udpatedValue);
                setShowEditInput(false);
              }
            }}
          />
        ) : (
          <>
            {todo?.isCompleted ? (
              <span style={{ textDecoration: "line-through" }}>
                {todo?.title}
              </span>
            ) : (
              <span>{todo?.title}</span>
            )}
          </>
        )}
      </div>
      <div className="todo-action-buttons">
        <div onClick={() => handleCompletedTask(todo?.id)}>✔️</div>
        <div onClick={() => handleRemoveTask(todo?.id)}>❌</div>
        {!showEditInput && !todo.isCompleted && (
          <div onClick={() => setShowEditInput(true)}>📝</div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
