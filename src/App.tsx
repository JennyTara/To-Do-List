import React from 'react';
import './App.css';
import ToDoList from './ToDoList';


function App() {

  // function handleDelete(todoId: number) {
  //   setTodosArray(todosArray.filter(item => item.index !== todoId))
  // }
  // function handleAddTodo(title: string) {
  //   setTodosArray([...todosArray, { index: nextId++, title: title, isCompleted: false }])
  // }
  return (
    <div className="app-wrapper" >
      <div className="app">
        <div className="todo-title">
          <h1>ToDo List</h1>
        </div>
        <ToDoList />
      </div>
    </div>
  );
}

export default App;
