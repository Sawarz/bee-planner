import React from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Calendar() {
  let todayDate = useSelector(state => state.todayDate);

  let year = new Date().getFullYear();
  let month = new Date().getMonth()+1;
  
  function previousMonthDays() {
    let firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    if (firstDayOfMonth === 0) {
      firstDayOfMonth = 7;
    }
    let previousMonthLastDay;
    if (month === 1) {
      previousMonthLastDay = new Date(year - 1, month - 1, 0).getDate();
    }
    else {
      previousMonthLastDay = new Date(year, month - 1, 0).getDate();
    }
    let numOfDays = firstDayOfMonth - 1;
    let start = previousMonthLastDay - numOfDays + 1;
    let divsArray = [];
    for (let i = start; i < previousMonthLastDay + 1; i++){
      divsArray.push(<div className={styles.grayDay}>{i}</div>);
    }
    return divsArray;
  }

  function currentMonthDays() {
    let start = 1;
    let monthDays = new Date(year, month, 0).getDate();
    let divsArray = [];
    for (let i = start; i < monthDays + 1; i++){
      if (i !== parseInt(todayDate))
      {
        divsArray.push(<Link to={`/calendar/` + i + "." + month + "." + year} className={styles.day}>{i}</Link>);
      }
      else {
        divsArray.push(<Link to={`/calendar/` + i + "." + month + "." + year} className={styles.currentDay}>{i}</Link>);
      }
    }
    return divsArray;
  }

  function nextMonthDays() {
    let start = 1;
    let monthLastDay = new Date(year, month, 0).getDate();
    let lastDayWeekday = new Date(year, month - 1, monthLastDay).getDay();
    let finish = 7 - lastDayWeekday;
    let divsArray = [];
    for (let i = start; i < finish + 1; i++){
      divsArray.push(<div className={styles.grayDay}>{i}</div>);
    }
    return divsArray;
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.todayDate}>{todayDate}</div>
      <div className={styles.weekdays}>
        <div className={styles.weekday}>Monday</div>
        <div className={styles.weekday}>Tuesday</div>
        <div className={styles.weekday}>Wednesday</div>
        <div className={styles.weekday}>Thursday</div>
        <div className={styles.weekday}>Friday</div>
        <div className={styles.weekday}>Saturday</div>
        <div className={styles.weekday}>Sunday</div>
      </div>
      <div className={styles.month}>
        {previousMonthDays()}
        {currentMonthDays()}
        {nextMonthDays()}
      </div>
    </div>
  )
}
