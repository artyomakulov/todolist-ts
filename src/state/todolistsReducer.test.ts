import {
  addTodolistActionCreator,
  changeTodolistFilterActionCreator,
  //   ChangeTodolistFilterActionType,
  changeTodolistTitleActionCreator,
  removeTodolistActionCreator,
  todolistsReducer,
} from './todolistsReducer'
import { v1 } from 'uuid'
import { FilterValueType, TodoListType } from '../App'

test('correct todolist should be removed', () => {
  let todoListId1 = v1()
  let todoListId2 = v1()

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'all' },
  ]

  //   const endState = todolistsReducer(startState, {
  //     type: 'REMOVE-TODOLIST',
  //     id: todoListId1,
  //   })

  const endState = todolistsReducer(
    startState,
    removeTodolistActionCreator(todoListId1)
  )

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {
  let todoListId1 = v1()
  let todoListId2 = v1()

  let newTodolistTitle = 'New todolist'

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'all' },
  ]

  //   const endState = todolistsReducer(startState, {
  //     type: 'ADD-TODOLIST',
  //     title: newTodolistTitle,
  //   })

  const endState = todolistsReducer(
    startState,
    addTodolistActionCreator(newTodolistTitle)
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
  expect(endState[2].filter).toBe('all')
})

test('correct todolist change its name', () => {
  let todoListId1 = v1()
  let todoListId2 = v1()

  let newTodolistTitle = 'New todolist'

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'all' },
  ]

  const action = changeTodolistTitleActionCreator(todoListId2, newTodolistTitle)

  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  let todoListId1 = v1()
  let todoListId2 = v1()

  let newFilter: FilterValueType = 'completed'

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'all' },
  ]

  //   const action: ChangeTodolistFilterActionType = {
  //     type: 'CHANGE-TODOLIST-FILTER',
  //     id: todoListId2,
  //     filter: newFilter,
  //   }

  const action = changeTodolistFilterActionCreator(newFilter, todoListId2)

  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})
