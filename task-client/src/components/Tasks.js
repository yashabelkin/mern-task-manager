import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import titleStyle from '../styles/modules/title.module.scss';
import TaskModal from './TaskModal';
import TaskItem from './TaskItem';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAsync, selectStatus, selectTasks } from '../slicers/taskSlicer';




const Tasks = () => {
  

  const taskItems = useSelector(selectTasks)
  const dataStatus = useSelector(selectStatus)

  const [list, setList] = useState("");
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  
  let listId = useParams();
  
  useEffect(() => {
    dispatch(getAsync({id:listId.id}))
  }, [dispatch, listId.id, taskItems]);

  useEffect(() => {
    axios
    .get(`http://127.0.0.1:8000/api/v1/lists/${listId.id}`)
    .then((response) => 
    setList(response.data.data))
    .catch((err) => console.log(err));
  }, [listId.id]);




  
  
    return (
      
      <div>
        
        <div className={titleStyle.title}>{list.name}</div>

        <Button variant="contained" size="large" onClick={()=> setModalOpen(true)}> Add Task</Button>
        <br/><br/>
        { taskItems.length > 0 
        ? taskItems.map((task)=> <TaskItem key={task.id} task={task}/> 
        )
        : <div className={titleStyle.text}>This list Is Empty</div>
        }
        <TaskModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} list={listId}></TaskModal>


    </div>

    
  )
}

export default Tasks