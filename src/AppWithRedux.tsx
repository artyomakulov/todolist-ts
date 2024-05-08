import './App.css'
import { TaskType, Todolist } from './Components/Todolist'
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
} from './state/todolistsReducer'
import {
  addTaskActionCreator,
  changeTaskStatusActionCreator,
  changeTaskTitleActionCreator,
  removeTaskActionCreator,
} from './state/tasksReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppRootState } from './state/store'

export type FilterValueType = 'all' | 'completed' | 'active'

export type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, Array<TodoListType>>(
    (state) => state.todolists
  )

  const tasks = useSelector<AppRootState, TasksStateType>(
    (state) => state.tasks
  )

  function removeTodolist(todoListId: string) {
    const action = removeTodolistActionCreator(todoListId)
    dispatch(action)
  }

  function addTask(title: string, todoListId: string) {
    const action = addTaskActionCreator(title, todoListId)
    dispatch(action)
  }

  function removeTask(id: string, todoListId: string) {
    const action = removeTaskActionCreator(id, todoListId)
    dispatch(action)
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    const action = changeTaskStatusActionCreator(taskId, isDone, todoListId)
    dispatch(action)
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todoListId: string
  ) {
    const action = changeTaskTitleActionCreator(taskId, newTitle, todoListId)
    dispatch(action)
  }

  function changeFilter(value: FilterValueType, todoListId: string) {
    const action = changeTodolistFilterActionCreator(value, todoListId)
    dispatch(action)
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const action = changeTodolistTitleActionCreator(id, newTitle)
    dispatch(action)
  }

  function addTodoList(title: string) {
    const action = addTodolistActionCreator(title)
    dispatch(action)
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
            let tasksForTodolist = tasks[tl.id]
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
              <Grid item key={tl.id}>
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

export default AppWithRedux
