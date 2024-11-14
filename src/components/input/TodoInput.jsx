// src/components/input.jsx
import React from 'react';
import './input.css';

function TodoInput({ newTodo, setNewTodo, addTodo }) {
  return (
    <div className="input-container">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button className='addItem' onClick={addTodo}>Add</button>
    </div>
  );
}

export default TodoInput;
