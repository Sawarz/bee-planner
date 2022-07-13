import React from 'react'
import styles from './styles.module.css'
import ToolBar from '../toolBar/ToolBar'
import { useMediaQuery } from 'react-responsive'

export default function DesktopRouteWrapper(props) {
  const isMobile = useMediaQuery({ maxWidth:750 });
  return (
    <div className={styles.desktopPage}>
      <ToolBar ></ToolBar>
      <div className={isMobile ? styles.mobilePageContent : styles.desktopPageContent}>
        {props.component}
      </div>
    </div>
  )
}
