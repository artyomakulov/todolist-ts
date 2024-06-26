import { FilterValueType, TodoListType } from '../App'
import { v1 } from 'uuid'

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  todolistId: string
}

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValueType
}

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType

export let todoListId1 = v1()
export let todoListId2 = v1()

const initialState: Array<TodoListType> = [
  { id: todoListId1, title: 'What to learn', filter: 'all' },
  { id: todoListId2, title: 'What to buy', filter: 'all' },
]

export const todolistsReducer = (
  state: Array<TodoListType> = initialState,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter((tl) => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [
        { id: action.todolistId, filter: 'all', title: action.title },
        ...state,
      ]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todoList = state.find((tl) => tl.id === action.id)
      if (todoList) {
        todoList.title = action.title
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      let todolist = state.find((tl) => tl.id === action.id)
      if (todolist) {
        todolist.filter = action.filter
      }
      return [...state]
    }
    default:
      return state
  }
}

export const removeTodolistActionCreator = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const addTodolistActionCreator = (
  title: string
): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title: title, todolistId: v1() }
}

export const changeTodolistTitleActionCreator = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}

export const changeTodolistFilterActionCreator = (
  filter: FilterValueType,
  todolistId: string
): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId }
}
