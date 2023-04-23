import React, { useEffect, useState } from 'react';
import styles from '../styles/modules/modal.module.scss'
import { MdOutlineClose } from 'react-icons/md'
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { addListAsync, updateListAsync } from '../slicers/listSlicer';
import { toast } from 'react-hot-toast';




const AddModal = ( {type, modalOpen, setModalOpen, list}) => {

  const dispatch = useDispatch();
  const [newList, setNewList] = useState("")


  
  useEffect(() => {
    if (type === 'update' && list ) {
      setNewList(list.name)
    }else {
      setNewList('')
    }
  }, [type, list, modalOpen ])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newList) {
      if (type === 'add') {
    dispatch(addListAsync({name:newList}))

    toast.success('List Added Successfully') 
    setTimeout(() => {
      window.location.reload()

    }, 500);
    setModalOpen(false)
    }
    if (type === 'update') {
      if(list.name !== newList ) {
        dispatch(updateListAsync({id:list.id, name:newList}))
        toast.success('List Updated Successfully', {duration: 500}) 
        setTimeout(() => {
          window.location.reload()

        }, 1000);

      } else {
        toast.error("No Changes Made")
      }
    }
  } else {
    toast.error("U Must Provide A Name For A List")
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
            {type === 'update' ? 'Update': 'Add'} List
            </h1>
            <label htmlFor='title'>
              List Name
              <input value={newList} onChange={(e)=>setNewList(e.target.value)} type="text" id="title"/>
            </label>
            <div className={styles.buttonContainer}>
              <Button   
              variant="contained" size="large" type='submit'>
              {type === 'update' ? 'Update': 'Add'}  List</Button>
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

export default AddModal