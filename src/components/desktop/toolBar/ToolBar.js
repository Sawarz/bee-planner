import React from 'react'
import styles from './styles.module.css'
import Logo from '../../shared/logo/Logo'
import AppName from '../../shared/appName/AppName'
import AddTask from './addTask/AddTask'

export default function ToolBar() {
    return (
      <div className={styles.toolBar}>
        <Logo></Logo>
        <AppName></AppName>
        <AddTask></AddTask>
      </div>
  )
}
