import { TextField } from '@mui/material'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import PlusOneIcon from '@mui/icons-material/PlusOne'

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  console.log('AddItemForm is called')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.key === 'Enter') {
      props.addItem(newTaskTitle)
      setNewTaskTitle('')
    }
  }
  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle.trim())
      setNewTaskTitle('')
    } else {
      setError('Title is required')
    }
  }
  return (
    <div>
      <TextField
        id="standard-basic"
        label="Call your task"
        variant="outlined"
        size="small"
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        helperText={error}
      />
      <button>
        <PlusOneIcon onClick={addTask} color="secondary">
          Add
        </PlusOneIcon>
      </button>
    </div>
  )
})
