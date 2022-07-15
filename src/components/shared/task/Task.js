import { React, useEffect, useState, useRef } from 'react'
import styles from './styles.module.css'
import firebase from '../../../firebase/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTask, updateTaskLeftPosition } from '../../../redux/tasksSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Task(props) {
  const [left, setLeft] = useState(props.data.left);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  const scrollRef = useRef();

  let dispatch = useDispatch();
  let data = props.data;
  let tasksData = useSelector(state => state.tasks);

  function checkTaskDay(task) {
    return task.date === data.date
  }

  let currentDayTasks = tasksData.filter(checkTaskDay);


  let parentDivHeight = props.parentDiv.current.offsetHeight;

  let top = (data.startHour * parentDivHeight / 24) + (data.startMinute * (parentDivHeight / (24 * 60))) + "px";

  useEffect(() => {
    let tempLeft = data.left;
    currentDayTasks.some(task => {
      if (data.id !== task.id) {
        let timeDifference;
        let hoursDifference = Math.abs(data.startHour - task.startHour);
        let minutesDifference = () => {
          if (hoursDifference === 1)
            return 60 - Math.abs(data.startMinute - task.startMinute);
          else {
            return Math.abs(data.startMinute + task.startMinute);
          }
        }
        timeDifference = minutesDifference();
        if (data.startHour === task.startHour || timeDifference < 30) {
          if (tempLeft === task.left) {
            tempLeft = parseInt(tempLeft) + 300 + "px";
            setLeft(tempLeft);
            dispatch(updateTaskLeftPosition({
              id: data.id,
              left: tempLeft
            }));
            firebase.update();
          }
        }
      }
    });
  }, [])
  

  function renderMinutes() {
    if (data.startMinute === 0) {
      return '00';
    }
    else if (data.startMinute === 5) {
      return '05';
    }
    else {
      return data.startMinute;
    }
  }

  let latestTask = useSelector(state => state.latestTask.task)

  useEffect(() => {
    if(latestTask != undefined)
      if(data.id === latestTask.id)
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) 
  }, [tasksData])
  
  return (
    <div className={styles.task} ref={scrollRef} style={{top: top, left: left, backgroundColor: data.color}}>
      {editMode ? 
      <>
        <input className={styles.input} onChange={(e)=>{
          let value = parseInt(e.target.value);
          if (value > 23) value = 23;
          let tempData = editData;
          tempData.startHour = value;
          setEditData(tempData);
        }} placeholder={data.startHour}></input>
        <input className={styles.input} onChange={(e)=>{
          let value = parseInt(e.target.value);
          if (value % 5 !== 0) {
            value = value + (5 - (value % 5));
          }
          if (value > 55) value = 55;
          let tempData = editData;
          tempData.startMinute = value;
          setEditData(tempData);
        }} placeholder={renderMinutes()}></input>
        <input className={styles.input} onChange={(e)=>{
          let tempData = editData;
          tempData.name = e.currentTarget.value;
          setEditData(tempData);
        }} placeholder={data.name}></input>
        <button onClick={() => {
          setEditMode(!editMode);
          dispatch(updateTask(editData))
          console.log(editData)
          firebase.update();
        }} className={styles.confirmButton}>
          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
        </button>
      </>
      :
      <>
        <div className={styles.startTime}>{data.startHour}:{renderMinutes()}</div>
        <div className={styles.name}>{data.name}</div>
        <button onClick={() => {
          setEditMode(!editMode);
          let changedData = {};
          changedData.id = data.id;
          changedData.name = data.name;
          changedData.startHour = data.startHour;
          changedData.startMinute = data.startMinute;
          console.log(changedData)
          setEditData(changedData);
        }} className={styles.editButton}>
          <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
        </button>
        <button onClick={() => {
          dispatch(deleteTask(data));
          firebase.update();
        }} className={styles.deleteButton}>X</button>
      </>
      }
    </div>
      
  )
}
