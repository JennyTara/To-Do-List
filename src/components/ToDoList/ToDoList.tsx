import React from 'react';
import {useState} from 'react'
import Button from '../../common/Button/Button';
import './ToDoList.css'

export default function ToDoList () {
    const [todos, setTodos] = useState<string[]>([])
    const [inputValue, setInputValue] = useState('')


    function addTask (): void {
        
        setTodos([...todos, inputValue])
        setInputValue('')
    }
    function handleChange (e:any): void {
        setInputValue(e.target.value)
    }
    function handleDelete (index: number): void {
        const newTodos = [...todos]
        newTodos.slice(index, 1)
        setTodos(newTodos)
    }




    return (
        <>
            <div className="add-item-wrapper">
                <input type="text" value={inputValue} onChange={handleChange} placeholder="Create a new ToDo..." className="add-item__input"></input>
                <Button title="add" onClick={addTask}></Button>
            </div>
            <div className="status-wrapper">
                <Button title="All"></Button>
                <Button title="Active"></Button>
                <Button title="Completed"></Button>
            </div>  
            <div className="tasks">
            
                    {todos.map((todo: string, index: number) => (
                        <div>
                            <input key={todo[index]} type="checkbox">{todo}</input>
                            <Button title="Delete" onClick={handleDelete(index)}></Button>
                        </div>
                    ))}
            
            </div>
        </>
    )
}
