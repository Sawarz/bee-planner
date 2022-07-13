import React from 'react'
import styles from './styles.module.css'
import Logo from '../../shared/logo/Logo'
import AppName from '../../shared/appName/AppName'
import AddTask from './addTask/AddTask'
import Profile from './profile/Profile'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import calendarImg from '../../../assets/calendar.png'

export default function ToolBar() {
  const mobileDevice = useMediaQuery({ maxWidth:750 });

    return (
      <div className={`${styles.toolBar} ${mobileDevice ? styles.mobileToolBar : null}`}>
        <Logo></Logo>
        <AppName></AppName>
        <AddTask></AddTask>
        <Link className={styles.calendarLink} to="/calendar"><img alt="calendar" className={styles.calendarImg} src={calendarImg} /></Link>
        <Profile></Profile>
      </div>
  )
}
