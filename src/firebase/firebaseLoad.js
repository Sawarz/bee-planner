import { app } from './app'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

let db = getFirestore(app);
let auth = getAuth(app);

async function loadTasksFromDB() {
    const docRef = doc(db, "users", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);
    const firestoreTasks = docSnap.data().tasks;
    return firestoreTasks
}


export default loadTasksFromDB;