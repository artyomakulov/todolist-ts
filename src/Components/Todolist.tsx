import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValueType } from '../App'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropTypes = {
  title: string
  tasks: TaskType[]
  removeTask: (id: string) => void
  changeFilter: (value: FilterValueType) => void
  addTask: (title: string) => void
}

export function Todolist(props: PropTypes) {
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.addTask(newTaskTitle)
      setNewTaskTitle('')
    }
  }

  const addTask = () => {
    props.addTask(newTaskTitle)
    setNewTaskTitle('')
  }

  const onAllClickHandler = () => props.changeFilter('all')
  const onActiveClickHandler = () => props.changeFilter('active')
  const onCompletedClickHandler = () => props.changeFilter('active')

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id)
          }

          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler}>Delete</button>
            </li>
          )
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}
