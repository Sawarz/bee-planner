import { React, useEffect, useState } from 'react'
import styles from './styles.module.css'
import Hour from './hour/Hour';
import Tile from './tile/Tile';
import { useSelector } from 'react-redux';

export default function Day() {
    const [tasks, setTasks] = useState([])

    const hoursInDay = 24;
    const minutesInHour = 60;
    const hoursInterval = 4;
    const minutesInterval = 5;
    const numberOfDivs = hoursInDay / hoursInterval;

    const colorsOdd = ["rgba(240, 248, 255, 0.856)", "rgba(250, 248, 129, 0.712)", "rgba(240, 248, 255, 0.856)", "rgba(250, 248, 129, 0.712)"];
    const colorsEven = ["rgba(240, 248, 255, 0.856)", "rgba(250, 212, 129, 0.712)", "rgba(240, 248, 255, 0.856)", "rgba(250, 212, 129, 0.712)"]

    let hoursChildren = [];

    for (let i = 0; i < numberOfDivs; i++) {
        let even = false;
        if (i % 2 == 0) even = true;
        for (let y = i * hoursInterval; y < hoursInterval * i + hoursInterval; y++){
            if(even)
                hoursChildren.push(<Hour key={y} hour={y} color={colorsOdd[y % 4]}></Hour>)
            else {
                hoursChildren.push(<Hour key={y} hour={y} color={colorsEven[y % 4]}></Hour>)
            }
        }}

    let height = useSelector((state) => state.divSize.size);
    let tasksData = useSelector((state) => state.tasks)
    
    useEffect(() => {
        console.log(tasksData);
        if(tasksData[0])
        setTasks([...tasks, (<div>{tasksData[0].name}</div>)]);
    }, [tasksData])

    return (
        <div className={styles.day}>
            {hoursChildren}
            {tasks}
        </div>     
  )
}
