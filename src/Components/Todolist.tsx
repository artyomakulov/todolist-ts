type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type PropTypes = {
  title: string
  tasks: Array<TaskType>
}

export function Todolist(props: PropTypes) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button></button>
      </div>
      <ul>
        <li>
          <input type="checkbox" checked={true} />
          <span>CSS</span>
        </li>
        <li>
          <input type="checkbox" checked={true} />
          <span>JS</span>
        </li>
        <li>
          <input type="checkbox" checked={false} />
          <span>REACT</span>
        </li>
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}
