import React, { useState, useEffect } from "react";
import { TodoForm } from "./Form";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./Edit";
uuidv4();

export const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  const addTodo = (todo) => {
    const newTodo = {
      id: uuidv4(),
      task: todo,
      completed: false,
      isEditing: false,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const editTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isEditing: !todo.isEditing };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const editTask = (task, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task, isEditing: !todo.isEditing };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) => (
        todo.isEditing ? (
          <EditTodoForm key={index} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={index}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      ))}
    </div>
  );
};
