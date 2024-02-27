import React from 'react';
import { useState } from 'react'
import Button from './components/Button';
import './ToDoList.css'

interface TodoList {
  index: number;
  title: string;
  isCompleted: boolean;
}
// const initialTodos = [
//   { index: 1, title: "First task", isCompleted: false },
//   { index: 2, title: "Second task", isCompleted: false },
//   { index: 3, title: "Third task", isCompleted: false }
// ]

export default function ToDoList () {
  const [todos, setTodos] = useState<TodoList[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [inputError, setInputError] = useState(false)
  const [showTextEror, setShowTextError] = useState<string>('')
  const [disableStatusButton, setDisableStatusButton] = useState(true)


  function addTask(): void {
    if (inputValue.trim() !== '' && inputValue.length <= 150) {
      setTodos([...todos, { index: (todos.length), title: inputValue, isCompleted: false }])
      console.log(todos)
    } else {
      setInputError(true)
      if (inputValue.trim() == '') {
        setShowTextError("*You must write something!")
      } else {
        setShowTextError("*Your ToDo is too long, please shorten it!")
      }
    }
    setInputValue('')
  }
  function handleSubmitInputByEnter(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.code === "Enter") {
      addTask()
    }
  }
  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputError(false)
    setShowTextError("")
    setInputValue(event.target.value)
  }
  function handleChangeCheckbox(id: number): void {
    const copyTodos = [...todos]
    copyTodos[id].isCompleted = !copyTodos[id].isCompleted
    setTodos(copyTodos)
  }
  function handleDelete(id: number): void {
    setTodos(todos.filter(item => item.index !== id))
  }
  function handleShowAll (): void {
    setTodos(todos)

  }

  return (
        <>
          <div className="add-item-wrapper">
            <input type="text" value={inputValue} onChange={handleChangeInput} onKeyDown={handleSubmitInputByEnter} tabIndex={1} className={inputError ? "add-item__input error" : "add-item__input"} placeholder="Create a new ToDo..." />
            <Button title="add" className="button" onClick={addTask} />
          </div>
          <div className="input-error">{showTextEror}</div>
          <div className="status-wrapper">
            <Button title="All" className="button" onClick={handleShowAll} disabled={disableStatusButton} />
            <Button title="Active" className="button" disabled={disableStatusButton} />
            <Button title="Completed" className="button" disabled={disableStatusButton} />
          </div>
          <div className="tasks">
            {!todos.length ? <div>There is no task to do...</div> : todos.map((todo) => (
              <div key={`myToDo-${todo.index}`} className="tasks__item">
                <div className="tasks__checkbox-text" >
                  <input className="tasks__checkbox" type="checkbox" checked={todo.isCompleted} onChange={() => handleChangeCheckbox(todo.index)} />
                  <div className={todo.isCompleted ? "tasks__text completed" : "tasks__text"}>{todo.title}</div>
                </div>
                <Button title="Delete" className="button" onClick={() => handleDelete(todo.index)} />
              </div>
            ))}
          </div>
        </>
      )
    }

