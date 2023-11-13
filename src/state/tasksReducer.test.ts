import { TasksStateType } from '../App'
import {
  addTaskActionCreator,
  changeTaskStatusActionCreator,
  changeTaskTitleActionCreator,
  removeTaskActionCreator,
  tasksReducer,
} from './tasksReducer'
import { addTodolistActionCreator, removeTodolistActionCreator } from './todolistsReducer'

test('correct task should be deleted from correct array', () => {
  const startState: TasksStateType = {
    todoListId1: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todoListId2: [
      { id: '1', title: 'Book', isDone: true },
      { id: '2', title: 'Milk', isDone: true },
      { id: '3', title: 'bread', isDone: false },
    ],
  }

  const action = removeTaskActionCreator('2', 'todoListId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todoListId1'].length).toBe(3)
  expect(endState['todoListId2'].length).toBe(2)
  expect(endState['todoListId2'].every((t) => t.id !== '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
  const startState: TasksStateType = {
    todoListId1: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todoListId2: [
      { id: '1', title: 'Book', isDone: true },
      { id: '2', title: 'Milk', isDone: true },
      { id: '3', title: 'bread', isDone: false },
    ],
  }

  const action = addTaskActionCreator('juice', 'todoListId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todoListId1'].length).toBe(3)
  expect(endState['todoListId2'].length).toBe(4)
  expect(endState['todoListId2'][0].id).toBeDefined()
  expect(endState['todoListId2'][0].title).toBe('juice')
  expect(endState['todoListId2'][0].isDone).toBe(false)
})

test('status of task should be changed', () => {
  const startState: TasksStateType = {
    todoListId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todoListId2: [
      { id: '1', title: 'Book', isDone: false },
      { id: '2', title: 'Milk', isDone: true },
      { id: '3', title: 'bread', isDone: false },
    ],
  }

  const action = changeTaskStatusActionCreator('2', false, 'todoListId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todoListId2'][1].isDone).toBeFalsy()
  expect(endState['todoListId1'][1].isDone).toBeTruthy()
})

test('title of task should be changed', () => {
  const startState: TasksStateType = {
    todoListId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todoListId2: [
      { id: '1', title: 'Book', isDone: false },
      { id: '2', title: 'Milk', isDone: true },
      { id: '3', title: 'bread', isDone: false },
    ],
  }

  const action = changeTaskTitleActionCreator('2', 'Milkyway', 'todoListId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todoListId2'][1].title).toBe('Milkyway')
  expect(endState['todoListId1'][1].title).toBe('JS')
})

test('new array should be added when new todolist is created', () => {
  const startState: TasksStateType = {
    todoListId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todoListId2: [
      { id: '1', title: 'Book', isDone: false },
      { id: '2', title: 'Milk', isDone: true },
      { id: '3', title: 'bread', isDone: false },
    ],
  }

  const action = addTodolistActionCreator('new todolist')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== 'todoListId1' && k !== 'todoListId2')

  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('propetry with todolistId should be deleted', () => {
  const startState: TasksStateType = {
    todoListId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todoListId2: [
      { id: '1', title: 'Book', isDone: false },
      { id: '2', title: 'Milk', isDone: true },
      { id: '3', title: 'bread', isDone: false },
    ],
  }

  const action = removeTodolistActionCreator('todoListId2')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todoListId2']).toBeUndefined()
})
