import React from 'react';
import { useState } from 'react'
import Button from './components/Button';
import './ToDoList.css'



export default function ToDoList() {
  const [todos, setTodos] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [checkedItem, setCheckedItem] = useState<boolean>(false)
  const [isCompleted, setCompleted] = useState<boolean>(false)


  function addTask(): void {
    if (inputValue.trim() !== '') {
      setCheckedItem(false)
      setTodos([...todos, inputValue])
    }
    setInputValue('')
  }
  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value)
  }
  function handleChangeCheckbox(): void {
    setCheckedItem(!checkedItem)
    setCompleted(!isCompleted)
  }
  function handleDelete(index: number): void {
    setTodos(todos.filter(item => todos.indexOf(item) !== index))
  }

  return (
    <>
      <div className="add-item-wrapper">
        <input type="text" value={inputValue} onChange={handleChangeInput} className="add-item__input" placeholder="Create a new ToDo..." />
        <Button title="add" className="button" onClick={addTask} />
      </div>
      <div className="status-wrapper">
        <Button title="All" className="button" disabled={true} />
        <Button title="Active" className="button" disabled={true} />
        <Button title="Completed" className="button" disabled={true} />
      </div>
      <div className="tasks">
        {todos.map((todo: string, index: number) => (
          <label key={`myToDo-${index}`} className="tasks__item">
            <div className="tasks__checkbox-text" >
              <input className="tasks__checkbox" type="checkbox" checked={checkedItem} onChange={handleChangeCheckbox} />
              <div className={isCompleted ? "tasks__text completed" : "tasks__text"}>{todo}</div>
            </div>
            <Button title="Delete" className="button" onClick={() => handleDelete(index)} />
          </label>
        ))}

      </div>
    </>
  )
}
