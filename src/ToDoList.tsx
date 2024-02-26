import React from 'react';
import { useState } from 'react'
import Button from './components/Button';
import './ToDoList.css'

interface ToDoList {
  index: number,
  title: string,
  isCompleted: boolean
}
let nextId = 4
const initialTodos = [
  { index: 1, title: "First task", isCompleted: false },
  { index: 2, title: "Second task", isCompleted: false },
  { index: 3, title: "Third task", isCompleted: false }
]


export default function ToDoList() {
  const [todosArray, setTodosArray] = useState<ToDoList[]>(initialTodos)
  const [todoTitle, setTodoTitle] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [inputError, setInputError] = useState(false)
  const [isCheckedItem, setIsCheckedItem] = useState<boolean>(false)
  const [isCompleted, setCompleted] = useState<boolean>(false)
  const [showTextEror, setShowTextError] = useState<string>('')


  function addTask(): void {
    if (inputValue.trim() !== '' && inputValue.length <= 150) {
      setIsCheckedItem(false)
      setTodoTitle([...todoTitle, inputValue])
      setTodosArray([...todosArray, { index: nextId++, title: inputValue, isCompleted: false }])
      console.log(todoTitle)
      console.log(todosArray)
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
  function handleChangeCheckbox(): void {
    setIsCheckedItem(!isCheckedItem)
    setCompleted(!isCompleted)
  }
  function handleDelete(index: number): void {
    console.log(index)
    // setTodosArray(todosArray.filter(item => item.index !== index))

    const newTodoTitle = [...todoTitle]
    newTodoTitle.splice(index, 1)
    setTodoTitle(newTodoTitle)
  }

  return (
    <>
      <div className="add-item-wrapper">
        <input type="text" value={inputValue} onChange={handleChangeInput} onKeyDown={handleSubmitInputByEnter} tabIndex={1} className={inputError ? "add-item__input error" : "add-item__input"} placeholder="Create a new ToDo..." />
        <Button title="add" className="button" onClick={addTask} />
      </div>
      <div className="input-error">{showTextEror}</div>
      <div className="status-wrapper">
        <Button title="All" className="button" disabled={true} />
        <Button title="Active" className="button" disabled={true} />
        <Button title="Completed" className="button" disabled={true} />
      </div>
      <div className="tasks">
        {todoTitle.map((todo, index) => (
          <div key={`myToDo-${index}`} className="tasks__item">
            <div className="tasks__checkbox-text" >
              <input className="tasks__checkbox" type="checkbox" checked={isCheckedItem} onChange={handleChangeCheckbox} />
              <div className={isCompleted ? "tasks__text completed" : "tasks__text"}>{todo}</div>
            </div>
            <Button title="Delete" className="button" onClick={() => handleDelete(index)} />
          </div>
        ))}

      </div>
    </>
  )
}
