// src/views/Home.jsx
import React, { useEffect, useState } from 'react';
import { database, auth } from '../../firebase';
import { ref, set, onValue, remove, update } from 'firebase/database';
import TodoInput from '../../components/input/TodoInput';
import TodoList from '../../components/list/TodoList';
import { signOut } from 'firebase/auth';
import './Home.css'; // Crea un archivo CSS para estilos específicos de Home

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Obtener el UID del usuario actual
  const user = auth.currentUser;
  const todosRef = ref(database, `todos/${user.uid}/`);

  // Obtener todos los ToDos en tiempo real
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

  // Agregar un nuevo ToDo
  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const newTodoRef = ref(database, `todos/${user.uid}/${Date.now()}`);
    set(newTodoRef, {
      title: newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
    });
    setNewTodo('');
  };

  // Toggle de completado
  const toggleComplete = (id, currentStatus) => {
    const todoRef = ref(database, `todos/${user.uid}/${id}/completed`);
    update(todoRef, { completed: !currentStatus });
  };

  // Eliminar ToDo
  const deleteTodo = (id) => {
    const todoRef = ref(database, `todos/${user.uid}/${id}`);
    remove(todoRef);
  };

  // Cerrar sesión
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="Home">
      <header className='header'>
        <h1>Todo List</h1>
        <h2>Welcome, {user.displayName || user.email}!</h2>
        <button className='singout' onClick={handleLogout}>Sing Out</button>
      </header>
      <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
    </div>
  );
}

export default Home;
