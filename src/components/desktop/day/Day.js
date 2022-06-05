import { React, useEffect, useState, useRef } from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux';
import Hour from './hour/Hour';
import Task from '../../shared/task/Task';
import CurrentTimeLine from '../../shared/currentTimeLine/CurrentTimeLine';

export default function Day() {
    const [tasks, setTasks] = useState([])
    const [currentTimeLine, setCurrentTimeLine] = useState(null);

    const dayDiv = useRef();

    const hoursInDay = 24;
    const hoursInterval = 4;
    const numberOfDivs = hoursInDay / hoursInterval;

    const colorsOdd = ["rgba(240, 248, 255, 0.256)", "rgba(250, 248, 129, 0.312)", "rgba(240, 248, 255, 0.456)", "rgba(250, 248, 129, 0.312)"];
    const colorsEven = ["rgba(240, 248, 255, 0.256)", "rgba(250, 212, 129, 0.312)", "rgba(240, 248, 255, 0.456)", "rgba(250, 212, 129, 0.312)"]

    let hoursChildren = [];

    for (let i = 0; i < numberOfDivs; i++) {
        let even = false;
        if (i % 2 === 0) even = true;
        for (let y = i * hoursInterval; y < hoursInterval * i + hoursInterval; y++){
            if(even)
                hoursChildren.push(<Hour key={y} hour={y} color={colorsOdd[y % 4]}></Hour>)
            else {
                hoursChildren.push(<Hour key={y} hour={y} color={colorsEven[y % 4]}></Hour>)
            }
        }}

    let tasksData = useSelector((state) => state.tasks)
    let todayDate = useSelector((state) => state.todayDate)

    useEffect(() => {
        let updatedTasks = tasksData.map((task, i) => {
            if(task.date === todayDate)
            return <Task key={i} data={task} parentDiv={dayDiv}></Task>
        });
        setTasks(updatedTasks);
        setCurrentTimeLine(<CurrentTimeLine parentDiv={dayDiv}></CurrentTimeLine>)
    }, [tasksData, todayDate])


    return (
        <div ref={dayDiv} className={styles.day}>
            {currentTimeLine}
            {hoursChildren}
            <div className={styles.tasks}>{tasks}</div>     
        </div>     
  )
}
