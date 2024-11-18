// src/views/home/Home.jsx
import React, { useEffect, useState } from 'react';
import { database, auth } from '../../firebase';
import { ref, set, onValue, remove, update } from 'firebase/database';
import TodoInput from '../../components/todoInput/TodoInput';
import TodoList from '../../components/todoList/TodoList';
import { signOut } from 'firebase/auth';
import './Home.css'; // Create a CSS file for specific Home styles

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [category, setCategory] = useState('Work'); // Default category
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  // Define available categories
  const availableCategories = ['Work', 'Personal', 'Urgent', 'Others'];

  // Get the current user's UID
  const user = auth.currentUser;
  const todosRef = ref(database, `todos/${user.uid}/`);

  // Get all ToDos in real-time
  useEffect(() => {
    onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      const todosList = [];
      for (let id in data) {
        todosList.push({ id, ...data[id] });
      }
      setTodos(todosList);
    });
  }, [todosRef]);

  // Add new Todo with category and tags
  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const newTodoRef = ref(database, `todos/${user.uid}/${Date.now()}`);
    set(newTodoRef, {
      title: newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
      category: category,
      tags: tags,
    });
    setNewTodo('');
    setCategory('Work'); // Reset to default category
    setTags([]); // Reset tags
    setTagInput(''); // Reset tag input
  };

  // Handle adding a tag
  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag !== '' && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setTagInput('');
  };

  // Remove a tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Completed Toggle
  const toggleComplete = (id, currentStatus) => {
    const todoRef = ref(database, `todos/${user.uid}/${id}/completed`);
    update(todoRef, { completed: !currentStatus });
  };

  // Delete ToDo
  const deleteTodo = (id) => {
    const todoRef = ref(database, `todos/${user.uid}/${id}`);
    remove(todoRef);
  };

  // Sign Out
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="Home">
      <header className='header'>
        <h1>Todo List</h1>
        <h2>Welcome, {user.displayName || user.email}!</h2>
        <button className='signout' onClick={handleLogout}>Sign Out</button>
      </header>
      <TodoInput
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        addTodo={addTodo}
        category={category}
        setCategory={setCategory}
        availableCategories={availableCategories}
        tagInput={tagInput}
        setTagInput={setTagInput}
        addTag={addTag}
        tags={tags}
        removeTag={removeTag}
      />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default Home;
