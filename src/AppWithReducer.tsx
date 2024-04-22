import React, { useReducer } from 'react'
import './App.css'
import { TaskType, Todolist } from './Components/Todolist'
import { v1 } from 'uuid'
import { AddItemForm } from './Components/AddItemForm'
import {
  AppBar,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {
  addTodolistActionCreator,
  changeTodolistFilterActionCreator,
  changeTodolistTitleActionCreator,
  removeTodolistActionCreator,
  todolistsReducer,
} from './state/todolistsReducer'
import {
  addTaskActionCreator,
  changeTaskStatusActionCreator,
  changeTaskTitleActionCreator,
  removeTaskActionCreator,
  tasksReducer,
} from './state/tasksReducer'

export type FilterValueType = 'all' | 'completed' | 'active'

export type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducer() {
  let todoListId1 = v1()
  let todoListId2 = v1()

  let [todolists, dispatchToTodoListsReducer] = useReducer(todolistsReducer, [
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'all' },
  ])

  const [tasksObj, dispatchToTaskReducer] = useReducer(tasksReducer, {
    [todoListId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Milk', isDone: true },
    ],
  })

  function removeTodolist(todoListId: string) {
    const action = removeTodolistActionCreator(todoListId)
    dispatchToTodoListsReducer(action)
    dispatchToTaskReducer(action)
  }

  function addTask(title: string, todoListId: string) {
    const action = addTaskActionCreator(title, todoListId)
    dispatchToTaskReducer(action)
  }

  function removeTask(id: string, todoListId: string) {
    const action = removeTaskActionCreator(id, todoListId)
    dispatchToTaskReducer(action)
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    const action = changeTaskStatusActionCreator(taskId, isDone, todoListId)
    dispatchToTaskReducer(action)
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todoListId: string
  ) {
    const action = changeTaskTitleActionCreator(taskId, newTitle, todoListId)
    dispatchToTaskReducer(action)
  }

  function changeFilter(value: FilterValueType, todoListId: string) {
    const action = changeTodolistFilterActionCreator(value, todoListId)
    dispatchToTodoListsReducer(action)
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const action = changeTodolistTitleActionCreator(id, newTitle)
    dispatchToTodoListsReducer(action)
  }

  function addTodoList(title: string) {
    const action = addTodolistActionCreator(title)
    dispatchToTodoListsReducer(action)
    dispatchToTaskReducer(action)
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={4}>
          {todolists.map((tl) => {
            let tasksForTodolist = tasksObj[tl.id]
            if (tl.filter === 'completed') {
              tasksForTodolist = tasksForTodolist.filter(
                (task) => task.isDone === true
              )
            }
            if (tl.filter === 'active') {
              tasksForTodolist = tasksForTodolist.filter(
                (task) => task.isDone === false
              )
            }
            return (
              <Grid item>
                <Paper style={{ padding: '10px' }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  )
}

export default AppWithReducer
