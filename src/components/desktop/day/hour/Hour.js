import { React, useEffect, useRef} from 'react'
import styles from './styles.module.css'
import { useDispatch } from 'react-redux'
import { setDivSize } from '../../../../redux/divSizeSlice'

export default function Hour(props) {
  const ref = useRef(null)
  let dispatch = useDispatch();

  useEffect(() => {
    console.log(ref.current.offsetHeight);
    dispatch(setDivSize(ref.current.offsetHeight))
  }, [])
  
  const hour = props.hour + ":00"

  return (
    <div ref={ref} className={styles.hour} style={{ backgroundColor: props.color }}>{hour}</div>
  )
}
