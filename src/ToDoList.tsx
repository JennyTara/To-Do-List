import React from 'react';
import { useState } from 'react'
import Button from './components/Button';
import './ToDoList.css'

export default function ToDoList() {
    const [todos, setTodos] = useState<string[]>([])
    const [inputValue, setInputValue] = useState<string>('')


    function addTask(): void {
        if (inputValue) {
            setTodos([...todos, inputValue])
        }
        setInputValue('')
    }
    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setInputValue(event.target.value)
    }
    function handleDelete(index: number): void {
        const newTodos = [...todos]
        newTodos.slice(index, 1)
        setTodos(newTodos)
    }

    return (
        <>
            <div className="add-item-wrapper">
                <input type="text" value={inputValue} onChange={handleChange} placeholder="Create a new ToDo..." className="add-item__input" />
                <Button title="add" className="button" onClick={addTask} />
            </div>
            <div className="status-wrapper">
                <Button title="All" className="button" disabled={true} />
                <Button title="Active" className="button" disabled={true} />
                <Button title="Completed" className="button" disabled={true} />
            </div>
            <div className="tasks">

                {todos.map((todo: string, index: number) => (
                    <div className="tasks__item" key={`myToDo-${index}`}>
                        <p>{index+1}. {todo}</p>
                        <Button title="Delete" className="button" onClick={() => handleDelete(index)} />
                    </div>
                ))}

            </div>
        </>
    )
}
