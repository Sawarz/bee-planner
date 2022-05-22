import store from '../redux/Store';
import loadTasks from './firebaseLoad'
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from './app';

let db = getFirestore(app);

const firebase = {
  app: app,
  db: db,
  loadTasks: loadTasks,
  update:
    async function update() {
      const docRef = doc(db, "users", "testUser");
      const tasksRedux = store.getState().tasks;
      await setDoc(doc(db, "users", "testUser"),
        {
          tasks: []
        })
      for (const task of tasksRedux) {
        const docSnap = await getDoc(docRef);
        const firestoreTasks = docSnap.data().tasks;
          await setDoc(doc(db, "users", "testUser"), 
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
