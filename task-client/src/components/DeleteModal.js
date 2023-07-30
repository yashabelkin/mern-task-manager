import React from 'react'
import styles from '../styles/modules/modal.module.scss'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { deleteListAsync } from '../slicers/listSlicer';
import { deleteTaskAsync } from '../slicers/taskSlicer';

const DeleteModal = ({itemType, modalOpen, setModalOpen, item}) => {
  const dispatch = useDispatch();

    const handleDelete = () => {
        if(itemType === "list") {
          dispatch(deleteListAsync({id:item.id}))
          console.log(item)

        } else {
          console.log(item)
          dispatch(deleteTaskAsync({id:item.id}))

        }

    }

  return (
    <div>{modalOpen && (

    
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
            <form className={styles.form} onSubmit={(e)=> {handleDelete(e)}}>
                
                <h1 className={styles.formTitle}> 
                 Are you sure you want to delete {item.name} from {itemType === 'list' ? 'lists': 'tasks'} ?
                </h1>
                
                <div className={styles.buttonContainer}>
                  <Button   
                  variant="contained" color="error" size="large" type='submit'>
                   Delete</Button>
                  <Button 
                  variant="contained" size="large" color='primary'
                  onClick={() =>   setModalOpen(false)}
                  onKeyDown={() => setModalOpen(false)}
                  type='button'>cancel</Button>
    
                </div>
              </form>
    
          </div>
      </div>
      )}</div>
  )
}

export default DeleteModal