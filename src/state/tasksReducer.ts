import { TasksStateType } from '../App'
import { v1 } from 'uuid'
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  todoListId1,
  todoListId2,
} from './todolistsReducer'

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  taskId: string
  todolistId: string
}

export type AddTaskActionType = {
  type: 'ADD-TASK'
  title: string
  todolistId: string
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskId: string
  todolistId: string
  isDone: boolean
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskId: string
  todolistId: string
  title: string
}

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

const initialState: TasksStateType = {
  [todoListId1]: [
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
  ],
  [todoListId2]: [
    { id: v1(), title: 'Book', isDone: true },
    { id: v1(), title: 'Milk', isDone: true },
  ],
}

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = { ...state }
      const tasks = state[action.todolistId]
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId)
      stateCopy[action.todolistId] = filteredTasks
      return stateCopy
    }
    case 'ADD-TASK': {
      const stateCopy = { ...state }
      const tasks = stateCopy[action.todolistId]
      const newTask = { id: v1(), title: action.title, isDone: false }
      const newTasks = [newTask, ...tasks]
      stateCopy[action.todolistId] = newTasks
      return stateCopy
    }
    case 'CHANGE-TASK-STATUS': {
      const stateCopy = { ...state }
      let tasks = stateCopy[action.todolistId]
      let task = tasks.find((task) => task.id === action.taskId)
      if (task) {
        task.isDone = action.isDone
      }
      return stateCopy
    }
    case 'CHANGE-TASK-TITLE': {
      const stateCopy = { ...state }
      let tasks = stateCopy[action.todolistId]
      let task = tasks.find((task) => task.id === action.taskId)
      if (task) {
        task.title = action.title
      }
      return stateCopy
    }
    case 'ADD-TODOLIST': {
      const stateCopy = { ...state }
      stateCopy[action.todolistId] = []
      return stateCopy
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state }
      delete stateCopy[action.id]
      return stateCopy
    }
    default:
      return state
  }
}

export const removeTaskActionCreator = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId }
}

export const addTaskActionCreator = (
  title: string,
  todolistId: string
): AddTaskActionType => {
  return { type: 'ADD-TASK', title: title, todolistId: todolistId }
}

export const changeTaskStatusActionCreator = (
  taskId: string,
  isDone: boolean,
  todolistId: string
): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', isDone, todolistId: todolistId, taskId }
}

export const changeTaskTitleActionCreator = (
  taskId: string,
  title: string,
  todolistId: string
): ChangeTaskTitleActionType => {
  return { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId: todolistId }
}
