// src/components/todoInput/TodoInput.jsx
import React from 'react';
import './TodoInput.css'; // Create a CSS file for TodoInput styles

function TodoInput({
  newTodo,
  setNewTodo,
  addTodo,
  category,
  setCategory,
  availableCategories,
  tagInput,
  setTagInput,
  addTag,
  tags,
  removeTag,
}) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };

  return (
    <div className="TodoInput">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {availableCategories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <div className="tags-input">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a tag and press Enter"
        />
        <button onClick={addTag}>Add Tag</button>
      </div>
      <div className="tags-list">
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag} <button onClick={() => removeTag(tag)}>x</button>
          </span>
        ))}
      </div>
      <button onClick={addTodo}>Add Task</button>
    </div>
  );
}

export default TodoInput;

