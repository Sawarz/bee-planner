import React from 'react'
import styles from './styles.module.css'
import ToolBar from '../toolBar/ToolBar'
import loadTasksFromDB from '../../../firebase/firebaseLoad';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../../redux/tasksSlice';

export default function DesktopRouteWrapper(props) {
  let dispatch = useDispatch();

  let tasks = useSelector(state => state.tasks);


  async function loadDBToRedux() {
    let tasksFromDB = await loadTasksFromDB();
    if (tasksFromDB) {
      tasksFromDB.forEach((taskDB) => {
        let isLoaded = tasks.some((task) => {
          return task.id == taskDB.id
        });
        if (isLoaded == false)
        dispatch(addTask(taskDB))
      })
      }
    }

  loadDBToRedux();
  
  return (
    <div className={styles.desktopPage}>
      <ToolBar ></ToolBar>
      <div className={styles.desktopPageContent}></div>
          {props.component}
    </div>
  )
}
