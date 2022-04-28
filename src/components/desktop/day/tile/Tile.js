import { React, useState } from 'react'
import styles from './styles.module.css'

export default function Tile(props) {
    const [numOfBlocks, setNumOfBlocks] = useState(Math.ceil(props.duration / 60))

  return (
      <div className={styles.tile}>
          <div className={styles.tileName}>
              {props.data.name}
          </div>
    </div>
  )
}
