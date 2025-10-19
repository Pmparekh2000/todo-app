import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  console.log("Rendering from Parent Todo component");

  const { setItem, getItem } = useLocalStorage();

  useEffect(() => {
    const todos = getItem("todos");
    if (todos) {
      setTodos(JSON.parse(todos));
    } else {
      setItem("todos", []);
    }
  }, []);

  useEffect(() => {
    setItem("todos", todos);
  }, [todos]);

  const addTodo = () => {
    if (inputValue === "") return;
    setTodos((prevValue) => {
      return [
        ...prevValue,
        {
          id: new Date().getTime(),
          title: inputValue,
          isCompleted: false,
        },
      ];
    });
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    const { key } = e;
    if (key === "Enter" && inputValue !== "") {
      addTodo();
    }
  };

  const handleCompletedTask = (taskId) => {
    setTodos((prevValue) => {
      const copyTodo = [...prevValue];
      copyTodo?.forEach((todo) => {
        if (todo?.id === taskId) {
          todo.isCompleted = !todo?.isCompleted;
        }
      });
      return copyTodo;
    });
  };

  const handleRemoveTask = (taskId) => {
    setTodos((prevValue) =>
      [...prevValue]?.filter((todo) => todo?.id !== taskId)
    );
  };

  const hadleEditTask = (taskId, updatedValue) => {
    setTodos((prevValue) =>
      prevValue?.map((todo) => {
        if (todo?.id === taskId) {
          todo.title = updatedValue;
        }
        return todo;
      })
    );
  };

  return (
    <div className="todos-container">
      <div>
        <input
          type="text"
          placeholder="Add Task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <div className="todo-list-container">
        {todos?.map((todo) => {
          return (
            <TodoItem
              key={todo?.id}
              todo={todo}
              handleCompletedTask={handleCompletedTask}
              handleRemoveTask={handleRemoveTask}
              hadleEditTask={hadleEditTask}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
