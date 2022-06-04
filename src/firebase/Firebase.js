import store from '../redux/Store';
import loadTasks from './firebaseLoad'
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from './app';
import { getAuth } from 'firebase/auth';

let db = getFirestore(app);
let auth = getAuth(app);

const firebase = {
  app: app,
  db: db,
  loadTasks: loadTasks,
  update:
    async function update() {
      const docRef = doc(db, "users", `${auth.currentUser.uid}`);
      const tasksRedux = store.getState().tasks;
      await setDoc(doc(db, "users", `${auth.currentUser.uid}`),
        {
          tasks: []
        })
      for (const task of tasksRedux) {
        const docSnap = await getDoc(docRef);
        const firestoreTasks = docSnap.data().tasks;
          await setDoc(doc(db, "users", `${auth.currentUser.uid}`), 
          {
            tasks: [
              ...firestoreTasks, task
            ]
          }
        );
      } 
    }
}

export default firebase;
