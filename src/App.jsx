// src/App.jsx
import React, { useEffect, useState } from 'react';
import { database } from './firebase';
import { ref, set, onValue, remove, update } from "firebase/database";

import TodoInput from './components/input/TodoInput';
import TodoList from './components/list/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Reference to the 'ToDos' path in the database
  const todosRef = ref(database, 'todos/');

  // Get all the ToDos in real-time
  useEffect(() => {
    onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      const todosList = [];
      for (let id in data) {
        todosList.push({ id, ...data[id] });
      }
      setTodos(todosList);
    });
  }, []);

  // Add a new ToDo
  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const newTodoRef = ref(database, `todos/${Date.now()}`);
    set(newTodoRef, {
      title: newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
    });
    setNewTodo('');
  };

  // completed Toggle
  const toggleComplete = (id, currentStatus) => {
    const todoRef = ref(database, `todos/${id}/completed`);
    update(todoRef, { completed: !currentStatus });
  };

  // Delete ToDo
  const deleteTodo = (id) => {
    const todoRef = ref(database, `todos/${id}`);
    remove(todoRef);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;

