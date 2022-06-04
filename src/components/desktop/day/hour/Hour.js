import React from 'react'
import styles from './styles.module.css'

export default function Hour(props) {
  const hour = props.hour + ":00"

  return (
    <div className={styles.hour} style={{ backgroundColor: props.color }}>{hour}</div>
  )
}
