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
  changeStatus: (taskId: string, isDone: boolean) => void
  filter: FilterValueType
}

export function Todolist(props: PropTypes) {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter') {
      props.addTask(newTaskTitle)
      setNewTaskTitle('')
    }
  }

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim())
      setNewTaskTitle('')
    } else {
      setError('Title is required')
    }
  }

  const onAllClickHandler = () => props.changeFilter('all')
  const onActiveClickHandler = () => props.changeFilter('active')
  const onCompletedClickHandler = () => props.changeFilter('completed')

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>Add</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id)
          }
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked)
          }

          return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={onChangeStatusHandler}
              />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler}>Delete</button>
            </li>
          )
        })}
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  )
}
