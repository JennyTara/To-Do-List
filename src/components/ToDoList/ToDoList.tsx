import React from 'react';
import { useState } from 'react';
import Button from '../Button/Button';
import './ToDoList.css';
import { ITodoList } from '../../App';
import { MY_SUPER_MEGA_MAGIC_NUMBER } from '../constants';


// const initialTodos = [
//   { index: 1, title: "First task", isCompleted: false },
//   { index: 2, title: "Second task", isCompleted: false },
//   { index: 3, title: "Third task", isCompleted: false }
// ]
interface ITodos {
  todos: ITodoList[];
  setTodos: React.Dispatch<React.SetStateAction<ITodoList[]>>;
  storedTodos:ITodoList[];
}
enum Filters {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export default function ToDoList({ todos, setTodos, storedTodos }: ITodos) {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);
  const [showTextEror, setShowTextError] = useState<string>('');
  const [disableStatusButton, setDisableStatusButton] = useState<boolean>(storedTodos === null ? true : false);
  const [filter, setFilter] = useState<Filters>(Filters.All);
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [inputValueEditing, setInputValueEditing] = useState<string>('');
  const [inputEditError, setInputEditError] = useState<boolean>(false);

  function addTask(): void {
    if (inputValue.trim() !== '' && inputValue.length <= MY_SUPER_MEGA_MAGIC_NUMBER) {
      setTodos([
        ...todos,
        { index: Math.random(), title: inputValue, isCompleted: false },
      ]);
      if (todos.length === 0) {
        setDisableStatusButton(false);
      }
    } else {
      setInputError(true);
      if (inputValue.trim() === '') {
        setShowTextError('*You must write something!');
      } else {
        setShowTextError('*Your ToDo is too long, please shorten it!');
      }
    }
    setInputValue('');
  }

  function handleSubmitInputByEnter(
    event: React.KeyboardEvent<HTMLInputElement>
  ): void {
    if (event.code === 'Enter') {
      addTask();
    }
  }

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputError(false);
    setShowTextError('');
    setInputValue(event.target.value);
  }

  function handleChangeCheckbox(id: number): void {
    setTodos(
      todos.map((todo) => {
        if (todo.index === id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      })
    );
  }

  function handleDelete(id: number): void {
    setTodos(todos.filter((item) => item.index !== id));
    if (todos.length === 1) {
      setDisableStatusButton(true);
    }
  }

  function handleChangeInputEditing(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setInputValueEditing(event.target.value);
  }

  function handleEditingItem(id: number, inputTitle: string): void {
    setEditingItem(id);
    setInputValueEditing(inputTitle);
  }

  function handleEditingSave(id: number): void {
    if (inputValueEditing.trim() !== '' && inputValueEditing.length <= MY_SUPER_MEGA_MAGIC_NUMBER) {
      setTodos(
        todos.map((todo) => {
          if (todo.index === id) {
            todo.title = inputValueEditing;
          }
          return todo;
        })
      );
      setInputEditError(false);
      setEditingItem(null);
    } else {
      setInputEditError(true);
    }
  }
  return (
    <>
      <div className="add-item-wrapper">
        <input
          type="text"
          value={inputValue}
          onChange={handleChangeInput}
          onKeyDown={handleSubmitInputByEnter}
          tabIndex={1}
          className={inputError ? "add-item__input error" : "add-item__input"}
          placeholder="Create a new ToDo..."
        />
        <Button title="add" className="button" onClick={addTask} />
      </div>
      <div className="input-error">{showTextEror}</div>
      <div className="status-wrapper">
        <Button
          title="All"
          className={
            !!todos.length && filter === Filters.All ? "button active-filter" : "button"
          }
          onClick={() => setFilter(Filters.All)}
          disabled={disableStatusButton}
        />
        <Button
          title="Active"
          className={filter === Filters.Active ? "button active-filter" : "button"}
          onClick={() => setFilter(Filters.Active)}
          disabled={disableStatusButton}
        />
        <Button
          title="Completed"
          className={filter === Filters.Completed ? "button active-filter" : "button"}
          onClick={() => setFilter(Filters.Completed)}
          disabled={disableStatusButton}
        />
      </div>
      <div className="tasks">
        {!todos.length ? (
          <div className="tasks__no-task">There is no task to do&hellip;</div>
        ) : (
          todos
            .filter((todo) => {
              if (filter === Filters.All) {
                return todos;
              } else if (filter === Filters.Active) {
                return !todo.isCompleted;
              } else if (filter === Filters.Completed) {
                return todo.isCompleted;
              }
            })
            .map((todo) => (
              <div key={`myToDo-${todo.index}`} className="tasks__item">
                {editingItem === todo.index ? (
                  <>
                    <div className="tasks__checkbox-text">
                      <input
                        className="tasks__checkbox"
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => handleChangeCheckbox(todo.index)}
                      />
                      <input
                        className={
                          inputEditError
                            ? "tasks__edit-input error"
                            : "tasks__edit-input"
                        }
                        type="text"
                        value={inputValueEditing}
                        onChange={handleChangeInputEditing}
                      />
                    </div>
                    <div className="tasks-buttons">
                      <Button
                        title="Save"
                        onClick={() => handleEditingSave(todo.index)}
                        className="button"
                      />
                      <Button
                        title="Cancel"
                        className="button"
                        onClick={() => setEditingItem(null)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="tasks__checkbox-text">
                      <input
                        className="tasks__checkbox"
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => handleChangeCheckbox(todo.index)}
                      />
                      <div
                        className={
                          todo.isCompleted
                            ? "tasks__text completed"
                            : "tasks__text"
                        }
                      >
                        {todo.title}
                      </div>
                    </div>
                    <div className="tasks-buttons">
                      <Button
                        title="Edit"
                        onClick={() =>
                          handleEditingItem(todo.index, todo.title)
                        }
                        className="button"
                      />
                      <Button
                        title="Delete"
                        className="button"
                        onClick={() => handleDelete(todo.index)}
                      />
                    </div>
                  </>
                )}
              </div>
            ))
        )}
      </div>
    </>
  );
}
