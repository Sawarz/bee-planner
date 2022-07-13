import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

export default function AppName(props) {
    return (
        <Link className={styles.nameLink} to="/">
            <div className={props.isMobile ? styles.mobileAppName : styles.appName}>Bee-planner</div>
      </Link>
  )
}
