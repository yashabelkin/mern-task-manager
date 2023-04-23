import React, { useState } from 'react';
import styles from '../styles/modules/todoItem.module.scss';
import {format} from 'date-fns/esm'
import { FcTodoList } from "react-icons/fc";
import { MdDelete, MdEdit } from 'react-icons/md';
import ListModal from './ListModal';
import { Link } from 'react-router-dom';
import DeleteModal from './DeleteModal';

const ListItem = ({list}) => {
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);


    const handleDelete = () => {

        setDeleteModal(true)
    }
    
    const handleUpdate = () => {

        setUpdateModal(true)
    }

  return (
    <>
    <div className={styles.item}>
        <Link style={{ textDecoration: 'none' }} className={styles.listBox} to={`/${list.id}`}> 
        <div className={styles.todoText}>
        <h2>
        <FcTodoList></FcTodoList> {"  "}{list.name}
        </h2>
        <p className={styles.time}>{format(new Date(list.date), 'p, dd/MM/yyyy' )}</p>
        </div>
        </Link >
        <div className={styles.todoActions}>
            <div className={styles.icon}
             onClick={handleDelete}
             onKeyDown={handleDelete}
             role="button"
             tabIndex={0}>
                <MdDelete></MdDelete>
            </div>
            <div className={styles.icon}
            onClick={handleUpdate}
            onKeyDown={handleUpdate}
            role="button"
            tabIndex={0}
            >
                <MdEdit></MdEdit>
            </div>
        </div>
    </div>
    <ListModal
     type="update" 
     modalOpen={updateModal} 
     setModalOpen={setUpdateModal}
     list={list}
     ></ListModal>
     <DeleteModal
     itemType="list"
     modalOpen={deleteModal} 
     setModalOpen={setDeleteModal}
     item={list}>
     </DeleteModal>
     
    </>
  )
}

export default ListItem