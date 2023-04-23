import { Button } from '@mui/material'
import React, { useState } from 'react'
import styles from '../styles/modules/modal.module.scss'
import AddModal from './ListModal';



const AppHeader = () => {

    const [modalOpen, setModalOpen] = useState(false);


  return (
    <div className={styles.appHeader}>
        <Button variant="contained" size="large" onClick={()=> setModalOpen(true)}> Add List</Button>
        <br/><br/>
        <AddModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen}></AddModal>
        
    </div>
  )
}

export default AppHeader