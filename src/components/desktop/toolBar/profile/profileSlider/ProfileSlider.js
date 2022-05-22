import React from 'react'
import styles from './styles.module.css'
import { getAuth, signOut } from 'firebase/auth'

export default function ProfileSlider() {
    const auth = getAuth();

  return (
      <div className={styles.slider}>
          <button className={styles.signOutButton} onClick={() => {
              signOut(auth);
          }}>Sign out</button>
    </div>
  )
}
