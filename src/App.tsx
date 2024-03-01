import React from "react";
import "./App.css";
import ToDoList from "./ToDoList";

export default function App() {
  return (
    <div className="app-wrapper">
      <div className="app">
        <div className="todo-title">
          <h1>ToDo List</h1>
        </div>
        <ToDoList />
      </div>
    </div>
  );
}
