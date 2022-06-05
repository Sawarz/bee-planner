import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import logoImg from '../../../assets/logo.png'

export default function Logo() {
  return (
      <Link className={styles.logoLink} to="/">
          <img alt="bee logo" src={logoImg} height="80px"></img>
    </Link>
  )
}
