import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material'

const EditBox = ({ handleClose, handleEdit, open, task }) => {

    const [name, setName] = useState(task.name)
    const [description, setDescription] = useState(task.description)

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
                <DialogTitle>{"UPDATE TASK"}</DialogTitle>
                <form onSubmit={(e) => {
                    handleEdit(e, task.id, name, description)
                    handleClose()
                }}>
                    <DialogContent className='submitDialog'>
                        <label>TODO</label>
                        <input type='text' required value={name} className='textField' onChange={(e) => setName(e.target.value)} />
                        <label>Description</label>
                        <textarea className='textArea' rows="5" cols="50" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" type='submit'>Update</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default EditBox
