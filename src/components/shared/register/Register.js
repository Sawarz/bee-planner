import { React, useState } from 'react';
import styles from './styles.module.css'
import { Link } from 'react-router-dom';

export default function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    }
    
  return <div className={styles.Register}>
    <div className={styles.header}>
      <h1>Log in here!</h1>
    </div>
      <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.formLabel}>
        <p>Username</p>
        <input type="text" onChange={e => setUserName(e.target.value)}/>
      </label>
      <label className={styles.formLabel}>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
      </label>
      <div className={styles.submitDiv}>
        <button className={styles.submitButton} type="submit">Submit</button>
      </div>
    </form>
      <Link className={styles.authLink} to="/register">Create an account here!</Link>
    </div>;
}
