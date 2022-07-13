import React from 'react'
import styles from './styles.module.css'
import ToolBar from '../toolBar/ToolBar'

export default function DesktopRouteWrapper(props) {
  return (
    <div className={styles.desktopPage}>
      <ToolBar ></ToolBar>
      <div className={styles.desktopPageContent}>
        {props.component}
      </div>
    </div>
  )
}
