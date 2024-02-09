import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material'

const DialogBox = ({handleSubmit, handleClose, open, time}) => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const taskObj = {
        id: Date.now(),
        name,
        description, 
        completed: false,
        date: time,
        completedDate: null,
    }

    return (
        <div>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                className='dialogBox'
                maxWidth='md'
                fullWidth='true'
            >
                <DialogTitle>{"ADD TASK"}</DialogTitle>
                <form onSubmit={(e)=>{
                    handleSubmit(e,taskObj)
                    setName("")
                    setDescription("")
                    }}>
                    <DialogContent className='submitDialog'>
                        <label>TODO</label>
                        <input type='text' required value={name} className='textField' onChange={(e) => setName(e.target.value)} />
                        <label>Description</label>
                        <textarea className='textArea' rows="5" cols="50" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" type='submit'>Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default DialogBox
