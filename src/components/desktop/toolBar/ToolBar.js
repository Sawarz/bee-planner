import { React, useState } from 'react'
import styles from './styles.module.css'
import Logo from '../../shared/logo/Logo'
import AppName from '../../shared/appName/AppName'
import AddTask from './addTask/AddTask'
import Profile from './profile/Profile'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import calendarImg from '../../../assets/calendar.png'

export default function ToolBar() {
  const isMobile = useMediaQuery({ maxWidth: 750 });
  
  const [menuItemsStyles, setMenuItemsStyles] = useState(`${styles.menuItems}`)
  const [line1Style, setLine1Style] = useState(`${styles.line} ${styles.line1}`)
  const [line2Style, setLine2Style] = useState(`${styles.line} ${styles.line2}`)
  const [line3Style, setLine3Style] = useState(`${styles.line} ${styles.line3}`)

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

    return (
      <div className={isMobile ? styles.mobileToolBar : styles.toolBar}>
        <Logo></Logo>
        <AppName isMobile={isMobile}/>
        {isMobile ?
          <>
          <div className={styles.hamburgerLines} onClick={() => {
                if (hamburgerOpen){
                    setLine1Style(`${styles.line} ${styles.line1}`);
                    setLine2Style(`${styles.line} ${styles.line2}`);
                    setLine3Style(`${styles.line} ${styles.line3}`);
                    setMenuItemsStyles(`${styles.menuItems}`)
                }
                else {
                    setLine1Style(line1Style + " " + styles.line1Animation);
                    setLine2Style(line2Style + " " + styles.line2Animation);
                    setLine3Style(line3Style + " " + styles.line3Animation);
                    setMenuItemsStyles(`${styles.menuItems} ${styles.menuItemsAnimation}`)
                }
            setHamburgerOpen(!hamburgerOpen);
          }}>
            <span className={line1Style}></span>
            <span className={line2Style}></span>
            <span className={line3Style}></span>
          </div>
          <div className={menuItemsStyles}>
              <AddTask/>
              <Link className={styles.calendarLink} to="/calendar"><img alt="calendar" className={styles.calendarImg} src={calendarImg} /></Link>
              <Profile/>
          </div>
          </>
          :
          <>
            <AddTask />
            <Link className={styles.calendarLink} to="/calendar"><img alt="calendar" className={styles.calendarImg} src={calendarImg} /></Link>
            <Profile></Profile>
          </>
        }
        
      </div>
  )
}
