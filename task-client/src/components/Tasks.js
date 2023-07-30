import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
  }, [dispatch, listId.id]);

  useEffect(() => {
    axios
    .get(`https://mren-task-app.onrender.com/api/v1/lists/${listId.id}`)
    .then((response) => 
    setList(response.data.data))
    .catch((err) => console.log(err));
  }, [listId.id]);




  
  
    return (
      
      <div>

        <div className={titleStyle.title}>{list.name}</div>

        <Button variant="contained" size="large" onClick={()=> setModalOpen(true)}> Add Task</Button>
        <br/><br/>
        {dataStatus === 'loading' ? <Backdrop open
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}><CircularProgress color="inherit" /></Backdrop>
        : taskItems.length > 0 
        ? taskItems.map((task)=> <TaskItem key={task.id} task={task}/> 
        )
        : <div className={titleStyle.text}>This list Is Empty</div>
        }
        
        <TaskModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} list={listId}></TaskModal>

        <div className={titleStyle.center}>
        <Link to="/">
        <Button>Return</Button>
      </Link>
        </div>
    </div>

    
  )
}

export default Tasks