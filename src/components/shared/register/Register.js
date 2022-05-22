import { React, useState } from 'react';
import styles from './styles.module.css'
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export default function Login({setToken}) {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [errorMessage, setErrorMessage] = useState();
  
  const auth = getAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      console.log(email);
      console.log(userCredential);
      setErrorMessage("");
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      switch (errorCode) {
        case ("auth/invalid-email"): {
          setErrorMessage("Enter valid email");
          break;
        }
        case ("auth/weak-password"): {
          setErrorMessage("Password too weak (atleast 6 characters)");
          break;
        }
      }
    });
    }
    
  return <div className={styles.Register}>
    <div className={styles.header}>
      <h1>Register here!</h1>
    </div>
      <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.formLabel}>
        <p>Email</p>
        <input type="email" onChange={e => setEmail(e.target.value)}/>
      </label>
      <label className={styles.formLabel}>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
      </label>
      <div className={styles.submitDiv}>
        <button className={styles.submitButton} type="submit">Submit</button>
      </div>
    </form>
    <div className={styles.errorMessage}>{errorMessage}</div>
      <Link className={styles.authLink} to="/login">Log in here!</Link>
    </div>;
}
