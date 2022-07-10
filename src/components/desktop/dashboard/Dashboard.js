import React from 'react'
import styles from './styles.module.css'
import Day from '../day/Day'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDay } from '../../../redux/currentDaySlice';

export default function Dashboard(props) {
  const params = useParams();
  const dispatch = useDispatch();

  let currentDay;
  let initialDate = useSelector(state => state.todayDate);
  if (params.day === undefined)
    currentDay = initialDate;
  else
    currentDay = params.day;
  dispatch(setCurrentDay(currentDay));

  return (
    <div className={styles.dashboard}>
      <Day currentDay={currentDay}></Day>
    </div>
  )
}
