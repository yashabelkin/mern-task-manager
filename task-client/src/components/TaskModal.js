import React, { useEffect, useState } from 'react';
import styles from '../styles/modules/modal.module.scss'
import { MdOutlineClose } from 'react-icons/md'
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { addTaskAsync, updateTaskAsync } from '../slicers/taskSlicer';




const TaskModal = ( {type, modalOpen, setModalOpen, task, list}) => {

  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("")
  const [status, setStatus] = useState(false)


  useEffect(() => {
    if (type === 'update' && task ) {
      setNewTask(task.name)
      setStatus(task.completed)
    }else {
      setNewTask('')
      setStatus(false)
    }
  }, [type, modalOpen ])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newTask) {
      if (type === 'add') {
        console.log(status)
    dispatch(addTaskAsync({name:newTask, completed:status, list:list.id}))

    toast.success('Task Added Successfully') 
    setTimeout(() => {
      

    }, 500);
    setModalOpen(false)
    }
    if (type === 'update') {
      if(task.name !== newTask || task.completed !== status  ) {
        dispatch(updateTaskAsync({id:task.id, name:newTask}))
        toast.success('Task Updated Successfully', {duration: 1000}) 
        setModalOpen(false)

      } else {
        toast.error("No Changes Made")
      }
    }
  } else {
    toast.error("U Must Provide A Name For A Task")
  }
  }

  return (
    <div>
    {modalOpen && (

    
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.closeButton}
        onClick={() => setModalOpen(false)}
        onKeyDown={() => setModalOpen(false)}
        tabIndex={0}
        role="button"
        >
          <MdOutlineClose/>
        </div>
        <form className={styles.form} onSubmit={(e)=> handleSubmit(e)}>
            <h1 className={styles.formTitle}> 
            {type === 'update' ? 'Update': 'Add'} Task
            </h1>
            <label htmlFor='title'>
              Task Name
              <input value={newTask} onChange={(e)=>setNewTask(e.target.value)} type="text" id="title"/>
            </label>
            <label htmlFor='status'>
              Status
              <select     
              name='status' 
              id='status' 
              value={status} 
              onChange={(e)=> setStatus(e.target.value) }>
                <option value={false} >Incomplete</option>
                <option value={true}>Complete</option>
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <Button   
              variant="contained" size="large" type='submit'>
              {type === 'update' ? 'Update': 'Add'}  Task</Button>
              <Button 
              variant="contained" size="large" color='error'
              onClick={() => setModalOpen(false)}
              onKeyDown={() => setModalOpen(false)}
              type='button'>cancel</Button>

            </div>
          </form>

      </div>
  </div>
  )}
  </div>
  )
}

export default TaskModal