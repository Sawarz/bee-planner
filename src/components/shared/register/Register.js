import { React, useState } from 'react';
import styles from './styles.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../../../firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';


export default function Login({setToken}) {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [errorMessage, setErrorMessage] = useState();
  
  const db = getFirestore(app);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setDoc(doc(db, "users", `${auth.currentUser.uid}`),
        {
          username: username
          })
        setErrorMessage("");
        navigate("/login");
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
        case ("auth/email-already-in-use"): {
          setErrorMessage("Email already used by an account");
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
      <label className={styles.formLabel}>
        <p>Username</p>
        <input type="text" onChange={e => setUsername(e.target.value)}/>
      </label>
      <div className={styles.submitDiv}>
        <button className={styles.submitButton} type="submit">Submit</button>
      </div>
    </form>
    <div className={styles.errorMessage}>{errorMessage}</div>
      <Link className={styles.authLink} to="/login">Log in here!</Link>
    </div>;
}
