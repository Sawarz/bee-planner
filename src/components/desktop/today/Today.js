import React from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import Day from '../day/Day';

export default function Today() {
  const date = new Date();
  const todayYear = date.getFullYear();
  const todayMonth = date.getMonth()+1;
  const todayDay = date.getDate();
  const todayTasks = useSelector((state) => state.calendar)

  return (
    <div className={styles.today}>
      <div className={styles.date}>
        {todayDay+'.'+todayMonth+'.'+todayYear}
      </div>
      <div className={styles.title}>Today's tasks:</div>
      <Day></Day>
    </div>
  )
}
