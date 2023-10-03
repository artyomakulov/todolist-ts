import React, { useState } from 'react'
import './App.css'
import { TaskType, Todolist } from './Components/Todolist'

export type FilterValueType = 'all' | 'completed' | 'active'

function App() {
  let [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, title: 'CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'React', isDone: false },
  ])

  let [filter, setFilter] = useState<FilterValueType>('all')

  // let tasks2 = [
  //   { id: 1, title: 'Terminator', isDone: true },
  //   { id: 2, title: 'LOTR', isDone: true },
  //   { id: 3, title: 'Hobbit', isDone: false },
  // ]

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((task) => task.id !== id)
    setTasks(filteredTasks)
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
      />
      {/* <Todolist title="Movies" tasks={tasks2} /> */}
    </div>
  )
}

export default App
