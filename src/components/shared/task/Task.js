import { React, useEffect, useState } from 'react'
import styles from './styles.module.css'
import firebase from '../../../firebase/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import tasksSlice, { deleteTask, updateTaskLeftPosition } from '../../../redux/tasksSlice';

export default function Task(props) {
  const [left, setLeft] = useState(props.data.left);

  let dispatch = useDispatch();
  let data = props.data;
  let tasksData = useSelector(state => state.tasks);
  let localTasksData = tasksData.slice();
  let parentDivHeight = props.parentDiv.current.offsetHeight;

  let top = (data.startHour * parentDivHeight / 24) + (data.startMinute * (parentDivHeight / (24 * 60))) + "px";

  useEffect(() => {
    let tempLeft = data.left;
    localTasksData.some(task => {
      if (data.id != task.id) {
        let timeDifference;
        let hoursDifference = Math.abs(data.startHour - task.startHour);
        let minutesDifference = () => {
          if (hoursDifference == 1)
            return 60 - Math.abs(data.startMinute - task.startMinute);
          else {
            return Math.abs(data.startMinute + task.startMinute);
          }
        }
        timeDifference = minutesDifference();
        if (data.name == "es") {
          console.log(timeDifference);
          console.log(task.name);
        }
        if (data.startHour == task.startHour || timeDifference < 30) {
          if (tempLeft == task.left) {
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
    if (data.startMinute == 0) {
      return '00';
    }
    else if (data.startMinute == 5) {
      return '05';
    }
    else {
      return data.startMinute;
    }
  }
  
  return (
    <div className={styles.task} style={{top: top, left: left, backgroundColor: data.color}}>
      <div className={styles.startTime}>{data.startHour}:{renderMinutes()}</div>
      <div className={styles.name}>{data.name}</div>
      <button onClick={() => {
        console.log(data)
        dispatch(deleteTask(data));
        firebase.update();
      }} className={styles.deleteButton}>X</button>
    </div>
  )
}
