import React from 'react'
import styles from './styles.module.css'
import firebase from '../../../firebase/Firebase';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../../redux/tasksSlice';

export default function Task(props) {
  let dispatch = useDispatch();
  let data = props.data;
  let parentDivHeight = props.parentDiv.current.offsetHeight;

  let top = (data.startHour * parentDivHeight / 24) + (data.startMinute * (parentDivHeight / (24 * 60))) + "px";
  console.log(top);

  function renderMinutes() {
    if (data.startMinute == 0) {
      return '00';
    }
    else {
      return data.startMinute;
    }
  }
  
  return (
    <div className={styles.task} style={{top: top, backgroundColor: data.color}}>
      <div className={styles.startTime}>{data.startHour}:{renderMinutes()}</div>
      <div className={styles.name}>{data.name}</div>
      <button onClick={() => {
        dispatch(deleteTask(data));
        firebase.update();
      }} className={styles.deleteButton}>X</button>
    </div>
  )
}
