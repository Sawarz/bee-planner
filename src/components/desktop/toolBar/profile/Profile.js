import { React, useState } from 'react'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import ProfileSlider from './profileSlider/ProfileSlider'


export default function Profile() {
  const [sliderToggle, setSliderToggle] = useState(false);

  return (
    <div className={styles.Profile}>
      <button className={styles.ProfileButton} onClick={()=>{setSliderToggle(!sliderToggle)}}>
      <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
      <FontAwesomeIcon icon={faUser} size="2x"></FontAwesomeIcon>
      </button>
      {sliderToggle ? <ProfileSlider /> : null}
    </div>
    
  )
}
