import { TasksStateType, TodoListType } from '../App'
import { tasksReducer } from './tasksReducer'
import { addTodolistActionCreator, todolistsReducer } from './todolistsReducer'

test('it should be equels', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodoListType> = []

  const action = addTodolistActionCreator('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todolistId)
  expect(idFromTodolists).toBe(action.todolistId)
})
