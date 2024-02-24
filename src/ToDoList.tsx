import React from 'react';
import { useState } from 'react'
import Button from './components/Button';
import './ToDoList.css'



export default function ToDoList() {
  const [todos, setTodos] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [inputError, setInputError] = useState(false)
  const [checkedItem, setCheckedItem] = useState<boolean>(false)
  const [isCompleted, setCompleted] = useState<boolean>(false)
  const [showTextEror, setShowTextError] = useState<string>('')


  function addTask(): void {
    if (inputValue.trim() !== '' && inputValue.length <= 150) {
      setCheckedItem(false)
      setTodos([...todos, inputValue])
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
  function handleSubmitInput(event: React.KeyboardEvent<HTMLInputElement>): void {
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
    setCheckedItem(!checkedItem)
    setCompleted(!isCompleted)
  }
  function handleDelete(index: number): void {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  return (
    <>
      <div className="add-item-wrapper">
        <input type="text" value={inputValue} onChange={handleChangeInput} onKeyDown={handleSubmitInput} tabIndex={1} className={inputError ? "add-item__input error" : "add-item__input"} placeholder="Create a new ToDo..." />
        <Button title="add" className="button" onClick={addTask} />
      </div>
      <div className="input-error">{showTextEror}</div>
      <div className="status-wrapper">
        <Button title="All" className="button" disabled={true} />
        <Button title="Active" className="button" disabled={true} />
        <Button title="Completed" className="button" disabled={true} />
      </div>
      <div className="tasks">
        {todos.map((todo: string, index: number) => (
          <div key={`myToDo-${index}`} className="tasks__item">
            <div className="tasks__checkbox-text" >
              <input className="tasks__checkbox" type="checkbox" checked={checkedItem} onChange={handleChangeCheckbox} />
              <div className={isCompleted ? "tasks__text completed" : "tasks__text"}>{todo}</div>
            </div>
            <Button title="Delete" className="button" onClick={() => handleDelete(index)} />
          </div>
        ))}

      </div>
    </>
  )
}
