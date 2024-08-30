import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./Form";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./Edit";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    const newTodo = {
      id: uuidv4(),
      task: todo,
      completed: false,
      isEditing: false,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
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
  };

  return (
    <div className="TodoWrapper">
      <h1>Create a planning list</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) => (
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      ))}
    </div>
  );
};
