// src/components/todoItem/TodoItem.jsx
import React from 'react';
import './TodoItem.css'; // Create a CSS file for TodoItem styles

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <li className={`TodoItem ${todo.completed ? 'completed' : ''}`}>
      <div className="task-info">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id, todo.completed)}
        />
        <span className="title">{todo.title}</span>
      </div>
      <div className="task-meta">
        <span className="category">{todo.category}</span>
        {todo.tags && todo.tags.length > 0 && (
          <span className="tags">
            {todo.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </span>
        )}
        <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </li>
  );
}

export default TodoItem;
