import React from 'react'
import styles from './styles.module.css'
import Today from '../today/Today'

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <Today></Today>
    </div>
  )
}
