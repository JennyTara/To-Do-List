import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import ToDoList from './components/ToDoList/ToDoList';

export interface ITodoList {
  index: number;
  title: string;
  isCompleted: boolean;
}
export default function App() {
  const storedTodos = JSON.parse(localStorage.getItem('todos') || "null");
  const [todos, setTodos] = useState<ITodoList[]>(storedTodos === null ? [] : storedTodos)
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="app-wrapper">
      <div className="app">
        <div className="todo-title">
          <h1>ToDo List</h1>
        </div>
        <ToDoList todos={todos} setTodos={setTodos} storedTodos={storedTodos} />
      </div>
    </div>
  );
}
