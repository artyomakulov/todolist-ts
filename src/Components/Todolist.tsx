import { ChangeEvent, useCallback } from 'react'
import { FilterValueType } from '../App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton'
import { Delete } from '@mui/icons-material'
import { Button, Checkbox } from '@mui/material'

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
  console.log('Todolist is called')

  const onAllClickHandler = () => props.changeFilter('all', props.id)
  const onActiveClickHandler = () => props.changeFilter('active', props.id)
  const onCompletedClickHandler = () =>
    props.changeFilter('completed', props.id)
  const removeTodolist = () => props.removeTodolist(props.id)
  const changeTodolistTitel = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }

  const addTask = useCallback((title: string) => {
    props.addTask(title, props.id)
  }, [])

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitel} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
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
            <div key={task.id} className={task.isDone ? 'is-done' : ''}>
              <Checkbox
                color="secondary"
                checked={task.isDone}
                onChange={onChangeStatusHandler}
              />
              <EditableSpan
                title={task.title}
                onChange={onChangeTitleHandler}
              />
              <IconButton onClick={onRemoveHandler} aria-label="delete">
                <Delete />
              </IconButton>
            </div>
          )
        })}
      </div>
      <div>
        <Button
          color="info"
          variant={props.filter === 'all' ? 'contained' : 'text'}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color="primary"
          variant={props.filter === 'active' ? 'contained' : 'text'}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color="secondary"
          variant={props.filter === 'completed' ? 'contained' : 'text'}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}
