import React from 'react'
import styles from './styles.module.css'
import Day from '../day/Day'
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCurrentDay } from '../../../redux/currentDaySlice';

export default function Dashboard(props) {
  const params = useParams();
  const dispatch = useDispatch();

  let currentDay;
  currentDay = params.day;
  dispatch(setCurrentDay(currentDay));

  return (
    <div className={styles.dashboard}>
      <Day currentDay={currentDay}></Day>
    </div>
  )
}
