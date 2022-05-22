import { React, useState, useEffect, useRef } from 'react'
import styles from './styles.module.css'

export default function CurrentTimeLine(props) {
    const [currentHour, setCurrentHour] = useState(new Date().getHours())
  const [currentMinutes, setCurrentMinutes] = useState(new Date().getMinutes())
  
  const scrollRef = useRef();

    let top = currentHour * (props.parentDiv.current.offsetHeight / 24) + (currentMinutes * (props.parentDiv.current.offsetHeight / (24 * 60))) + "px";
    
    useEffect(() => {
      let checkTime = setInterval(() => {
        const checkedHour = new Date().getHours();
        const checkedMinutes = new Date().getMinutes();
        if (checkedMinutes !== currentMinutes) {
          setCurrentHour(checkedHour);
          setCurrentMinutes(checkedMinutes);
        }
      }, 1000);

      return () => {
          clearInterval(checkTime);
      }
    }, [currentMinutes])
  
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' }) 
  },[])
    
    
  return (
    <div ref={scrollRef} className={styles.currentTimeLine} style={{top: top}}></div>
  )
}
