import React, { useCallback, useEffect, useState } from "react";
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

  //   const handleCompletedTask = useCallback((taskId) => {
  //     setTodos((prevValue) => {
  //       const copyTodo = [...prevValue];
  //       return copyTodo?.map((todo) => {
  //         if (todo?.id === taskId) {
  //           return { ...todo, isCompleted: !todo?.isCompleted };
  //         } else {
  //           return todo;
  //         }
  //       });
  //     });
  //   }, []);

  const handleRemoveTask = useCallback((taskId) => {
    setTodos((prevValue) =>
      [...prevValue]?.filter((todo) => todo?.id !== taskId)
    );
  }, []);

  const handleEditTask = useCallback((taskId, updatedValue) => {
    setTodos((prevValue) => {
      const copyTodo = [...prevValue];
      return copyTodo?.map((todo) => {
        if (todo?.id === taskId) {
          if (updatedValue) {
            return { ...todo, title: updatedValue };
          } else {
            return { ...todo, isCompleted: !todo?.isCompleted };
          }
        } else {
          return todo;
        }
      });
    });
  }, []);

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
              handleRemoveTask={handleRemoveTask}
              handleEditTask={handleEditTask}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
