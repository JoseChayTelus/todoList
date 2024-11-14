// src/components/item.jsx
import React from 'react';
import './item.css';

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id, todo.completed)}
      />
      <span>{todo.title}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
