import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch, } from 'react-redux';
import {  updateTaskAsync, } from '../slicers/taskSlicer';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import CheckBox from './CheckBox';
import DeleteModal from './DeleteModal';
import TaskModal from './TaskModal';

const TaskItem = ({task}) => {

const [checked, setChecked] = useState(false)
    
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleUpdate = () => {
        
    setUpdateModal(true)
}           
    useEffect(() => {
        if(task.completed === true) {
            setChecked(true);
        } else {
            setChecked(false)
        }
    }, [task.completed])
    
    
    const dispatch = useDispatch();
    const handleDelete = () => {

        setDeleteModal(true)
    }
    const handleCheck = () => {
        setChecked(!checked)
        console.log(checked)
        dispatch(updateTaskAsync({
            completed: checked ? false : true,
            id:task.id
        }))
    }


  return (
    <div className={styles.item}>
        <div className={styles.todoDetails}>
        <CheckBox checked={checked} handleCheck={handleCheck}/>

        <div className={styles.texts}>
            <p className={
                getClasses([styles.todoText,
                task.completed === true && styles['todoText--completed']])}>
                {task.name}
                </p>
        </div>
        </div>

        
        <div className={styles.todoActions}>
            <div className={styles.icon}>
                <MdDelete onClick={()=>handleDelete()}/>
            </div>
            <div className={styles.icon}
            onClick={handleUpdate}
            onKeyDown={handleUpdate}
            role="button"
            tabIndex={0}
            >
                <MdEdit/>
            </div>
            <TaskModal
            type="update" 
            modalOpen={updateModal} 
            setModalOpen={setUpdateModal}
            task={task}
            ></TaskModal>
            <DeleteModal
            itemType="task"
            modalOpen={deleteModal} 
            setModalOpen={setDeleteModal}
            item={task}>
            </DeleteModal>
        </div>
        </div>

    
  )
}

export default TaskItem