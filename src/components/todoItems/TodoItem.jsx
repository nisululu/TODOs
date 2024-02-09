import React, { useState } from 'react'
import './TodoItem.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditBox from '../dialogBox/EditBox';

const TodoItem = ({ item, handleDelete, handleEdit, handleChecked }) => {
    
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(!open)
    }

    return (
        <div className='todoItems' style={{ backgroundColor: item.completed ? "#00ffcc4e" : "#cce6ff" }}>
            <div className='todoItemsCard'>
                <div>
                    <Checkbox
                        checked={item.completed}
                        icon={<CheckCircleOutlinedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                        onChange={() => handleChecked(item)}
                        disabled={item.completed ? true : false}
                    />
                </div>
                <div >
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>Created: {item.date}</p>
                    <p>{item.completedDate ? "Completed: "+item.completedDate : "" }</p>
                </div>
            </div>

            <div className='editBox'>
                <EditBox
                    handleClose={handleClose}
                    open={open}
                    task={item}
                    handleEdit={handleEdit}
                />
            </div>

            <div>
                <EditIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpen(!open)}
                />
                <DeleteIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(item.id)}
                />
            </div>
        </div>
    )
}

export default TodoItem
