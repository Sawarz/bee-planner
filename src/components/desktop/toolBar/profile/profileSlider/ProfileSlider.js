import React from 'react'
import styles from './styles.module.css'
import { getAuth, signOut } from 'firebase/auth'
import { useSelector } from 'react-redux';

export default function ProfileSlider() {
  const auth = getAuth();
  const username = useSelector(state => state.username.value);

  return (
    <div className={styles.slider}>
      <div className={styles.username}>{username}</div>
          <button className={styles.signOutButton} onClick={() => {
            signOut(auth);
            window.location.reload();
          }}>Sign out</button>
    </div>
  )
}
