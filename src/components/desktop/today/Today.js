import React from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import Day from '../day/Day';

export default function Today() {
  let today = useSelector(state => state.todayDate);

  return (
    <div className={styles.today}>
      <div className={styles.date}>
        {today}
      </div>
      <div className={styles.title}>Today's tasks:</div>
      <Day></Day>
    </div>
  )
}
