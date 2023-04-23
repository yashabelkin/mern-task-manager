import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAsync, selectLists, selectStatus } from '../slicers/listSlicer';
import ListItem from './ListItem';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import titleStyle from '../styles/modules/title.module.scss';

const Lists = () => {

  const dispatch = useDispatch();
  const listItems = useSelector(selectLists)
  const dataStatus = useSelector(selectStatus)

  useEffect(() => {
    dispatch(getAsync())
  },[dispatch])

    
  return (
    <div>
      
      
      { dataStatus === 'loading' ?  <Backdrop open
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}><CircularProgress color="inherit" /></Backdrop> 
      : listItems && listItems.length > 0 ? listItems.map((list) => <ListItem key={list.id} list={list}/>)
      : <div className={titleStyle.text}>There are no lists</div>}

      </div>
  ) 
                   
}

export default Lists