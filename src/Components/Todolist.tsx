import { ChangeEvent } from 'react'
import { FilterValueType } from '../App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropTypes = {
  title: string
  tasks: TaskType[]
  removeTask: (id: string, todoListId: string) => void
  changeFilter: (value: FilterValueType, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todoListId: string
  ) => void
  filter: FilterValueType
  id: string
  removeTodolist: (todoListId: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropTypes) {
  const onAllClickHandler = () => props.changeFilter('all', props.id)
  const onActiveClickHandler = () => props.changeFilter('active', props.id)
  const onCompletedClickHandler = () =>
    props.changeFilter('completed', props.id)
  const removeTodolist = () => props.removeTodolist(props.id)
  const changeTodolistTitel = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitel} />
        <button onClick={removeTodolist}>x</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id, props.id)
          }
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.id)
          }
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(task.id, newValue, props.id)
          }

          return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={onChangeStatusHandler}
              />
              <EditableSpan
                title={task.title}
                onChange={onChangeTitleHandler}
              />
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
