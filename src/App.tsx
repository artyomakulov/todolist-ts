import React, { useState } from 'react'
import './App.css'
import { TaskType, Todolist } from './Components/Todolist'
import { v1 } from 'uuid'

export type FilterValueType = 'all' | 'completed' | 'active'

function App() {
  let [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
  ])
  let [filter, setFilter] = useState<FilterValueType>('all')

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    setTasks([newTask, ...tasks])
  }

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((task) => task.id !== id)
    setTasks(filteredTasks)
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((task) => task.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasks([...tasks])
  }

  function changeFilter(value: FilterValueType) {
    setFilter(value)
  }

  let tasksForTodolist = tasks
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter((task) => task.isDone === true)
  }
  if (filter === 'active') {
    tasksForTodolist = tasks.filter((task) => task.isDone === false)
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>
  )
}

export default App
