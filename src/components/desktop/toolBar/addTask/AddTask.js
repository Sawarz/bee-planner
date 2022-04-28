import { React, useState } from 'react'
import styles from './styles.module.css'
import PopUp from './popUp/popUp'

export default function AddTask() {
  const [popUp, setPopUp] = useState(false)
  return (
    <>
    <button className={styles.addTask} onClick={() => { setPopUp(!popUp) }}>
      <span>+</span>
    </button>
    {popUp ? <PopUp toggle={setPopUp} /> : null}
    </>
  )
}
