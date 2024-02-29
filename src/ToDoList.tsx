import React from 'react';
import { useState } from 'react'
import Button from './components/Button';
import './ToDoList.css'

interface TodoList {
  index: number;
  title: string;
  isCompleted: boolean;
}
let countId = 0
// const initialTodos = [
//   { index: 1, title: "First task", isCompleted: false },
//   { index: 2, title: "Second task", isCompleted: false },
//   { index: 3, title: "Third task", isCompleted: false }
// ]

export default function ToDoList () {
  const [todos, setTodos] = useState<TodoList[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [inputError, setInputError] = useState<boolean>(false)
  const [showTextEror, setShowTextError] = useState<string>('')
  const [disableStatusButton, setDisableStatusButton] = useState<boolean>(true)
  const [filter, setFilter] = useState<string>('all')



  function addTask(): void {
    if (inputValue.trim() !== '' && inputValue.length <= 150) {

      setTodos([...todos, { index: countId++, title: inputValue, isCompleted: false }])
      if(todos.length==0) {
        setDisableStatusButton(false)
      }
    } else {
      setInputError(true)
      if (inputValue.trim() == '') {
        setShowTextError("*You must write something!")
      } else {
        setShowTextError("*Your ToDo is too long, please shorten it!")
      }

    }
    setInputValue('')
    console.log(todos)
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
    setTodos(todos.map((todo) => {
      if (todo.index === id) {
        todo.isCompleted = !todo.isCompleted
      }
      return todo
    }))
  }

  function handleDelete(id: number): void {
    setTodos(todos.filter(item => item.index !== id))
    console.log(todos)
    if(todos.length ==1) {
      setDisableStatusButton(true)
    }
  }

  return (
        <>
          <div className="add-item-wrapper">
            <input type="text" value={inputValue} onChange={handleChangeInput} onKeyDown={handleSubmitInputByEnter} tabIndex={1} className={inputError ? "add-item__input error" : "add-item__input"} placeholder="Create a new ToDo..." />
            <Button title="add" className="button" onClick={addTask} />
          </div>
          <div className="input-error">{showTextEror}</div>
          <div className="status-wrapper">
            <Button title="All" className={((todos.length) && filter=='all'  ) ? 'button active-filter' : 'button'} onClick={()=> setFilter('all')}  disabled={disableStatusButton}/>
            <Button title="Active" className={filter=='active'? 'button active-filter' : 'button'} onClick={()=> setFilter('active')} disabled={disableStatusButton} />
            <Button title="Completed" className={filter=='completed'? 'button active-filter' : 'button'} onClick={()=> setFilter('completed')} disabled={disableStatusButton} />
          </div>
          <div className="tasks">
            {!todos.length ?
            <div>There is no task to do...</div> :
            todos.filter(todo => {
              if (filter === 'all') {
                return todos;
              } else if (filter === 'active') {
                return !todo.isCompleted;
              } else if (filter === 'completed') {
                return todo.isCompleted;
              }})
              .map((todo) => (
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

