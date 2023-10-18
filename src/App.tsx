import React, { useState } from 'react'
import './App.css'
import { Todolist } from './Components/Todolist'
import { v1 } from 'uuid'

export type FilterValueType = 'all' | 'completed' | 'active'
type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
}

function App() {
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

  function changeFilter(value: FilterValueType, todoListId: string) {
    let todolist = todolists.find((tl) => tl.id === todoListId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  let todoListId1 = v1()
  let todoListId2 = v1()

  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to learn', filter: 'active' },
    { id: todoListId2, title: 'What to buy', filter: 'completed' },
  ])


  let removeTodolist = (todoListId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todoListId)
    setTodolists(filteredTodolist)
    delete tasksObj[todoListId]
    setTasksObj({...tasksObj})
  }


  const [tasksObj, setTasksObj] = useState({
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

  return (
    <div className="App">
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
          />
        )
      })}
    </div>
  )
}

export default App
