import React, { useState } from 'react'
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

export type FilterValueType = 'all' | 'completed' | 'active'

export type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todoListId1 = v1()
  let todoListId2 = v1()

  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'all' },
  ])

  function removeTodolist(todoListId: string) {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todoListId)
    setTodolists(filteredTodolist)
    delete tasksObj[todoListId]
    setTasksObj({ ...tasksObj })
  }
  function addTask(title: string, todoListId: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todoListId]
    let newTasks = [newTask, ...tasks]
    tasksObj[todoListId] = newTasks
    setTasksObj({ ...tasksObj })
  }

  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId]
    let filteredTasks = tasks.filter((task) => task.id !== id)
    tasksObj[todoListId] = filteredTasks
    setTasksObj({ ...tasksObj })
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId]
    let task = tasks.find((task) => task.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasksObj({ ...tasksObj })
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todoListId: string
  ) {
    let tasks = tasksObj[todoListId]
    let task = tasks.find((task) => task.id === taskId)
    if (task) {
      task.title = newTitle
    }
    setTasksObj({ ...tasksObj })
  }

  function changeFilter(value: FilterValueType, todoListId: string) {
    let todolist = todolists.find((tl) => tl.id === todoListId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const todoList = todolists.find((tl) => tl.id === id)
    if (todoList) {
      todoList.title = newTitle
      setTodolists([...todolists])
    }
  }

  const [tasksObj, setTasksObj] = useState<TasksStateType>({
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

  function addTodoList(title: string) {
    let todolist: TodoListType = {
      id: v1(),
      filter: 'all',
      title: title,
    }
    setTodolists([todolist, ...todolists])
    setTasksObj({ ...tasksObj, [todolist.id]: [] })
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

export default App
