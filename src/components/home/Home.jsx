import React, { useEffect, useState } from 'react'
import './Home.css'
import { Button } from '@mui/material'
import TodoItem from '../todoItems/TodoItem'
import DialogBox from '../dialogBox/DialogBox'

const Home = () => {

  const [open, setOpen] = useState(false)
  const [task, setTask] = useState([])
  const [filter, setFilter] = useState(0)
  const [value, setValue] = useState("")

  const date =  new Date()
  const month = date.getMonth()+1
  const time = date.toLocaleTimeString("en-US",{
    hour: "2-digit",
    minute: "2-digit",
  })+ " - " +date.getDate()+"/"+month+"/"+date.getFullYear()

  const getLocalStorageData = JSON.parse(localStorage.getItem("task"))

  const handleSubmit = (e, taskObj) => {
    e.preventDefault()
    let tempList = task || []
    tempList.push(taskObj)
    localStorage.setItem("task", JSON.stringify(tempList))
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(!open)
  }

  const handleDelete = (id) => {
    let deletedData = task.filter(item => item.id !== id)
    setTask(deletedData)
    localStorage.setItem("task", JSON.stringify(deletedData))
    setValue("all")
    setFilter(0)
  }

  const handleEdit = (e, id, name, description) => {
    e.preventDefault()
    let tasks = task.map(item => item.id === id ? { ...item, name, description } : item)
    setTask(tasks)
    localStorage.setItem("task", JSON.stringify(tasks))
    setFilter(0)
    setValue("all")
  }

  const handleChecked = (data) => {
    let taskCompleted = task.map(item => item.id === data.id ? { ...item, completed: !data.completed, completedDate: time } : item)
    setTask(taskCompleted)
    localStorage.setItem("task", JSON.stringify(taskCompleted))
    setValue("all")
    setFilter(0)
  }

  const handleComplete = (e) => {
    if (e.target.value === "true") {
      setValue("true")
      setFilter(task.filter(item => item.completed === true))

    }

    if (e.target.value === "false") {
      setValue("false")
      setFilter(task.filter(item => item.completed === false))
    }

    if (e.target.value === "all") {
      setFilter(0)
    }
  }

  useEffect(() => {
    setTask(getLocalStorageData)
  }, [])

  return (
    <div className='homePage'>
      <h1>TODOs</h1>

      <div className='addTask'>
        <Button variant="contained" onClick={() => setOpen(!open)}>Add Task</Button>
        <select className='options' value={value} onChange={(e) => handleComplete(e)}>
          <option value="all">ALL</option>
          <option value="true">COMPLETED</option>
          <option value="false">INCOMPLETE</option>
        </select>
      </div>

      <div className='dialogBox'>
        <DialogBox handleSubmit={handleSubmit} handleClose={handleClose} open={open} time={time} />
      </div>

      <div className='todoList'>
        {
          filter === 0 ?
            task && task.map(item => {
              return (
                <TodoItem key={item.id} item={item} handleDelete={handleDelete} handleEdit={handleEdit} handleChecked={handleChecked} />
              )
            }) :
            filter.map(item => {
              return (
                <TodoItem key={item.id} item={item} handleDelete={handleDelete} handleEdit={handleEdit} handleChecked={handleChecked} />
              )
            })
        }
      </div>

    </div>
  )
}

export default Home
