import store from '../redux/Store';
import { app } from './app'
import { getFirestore, doc, getDoc } from "firebase/firestore";

let db = getFirestore(app);

async function loadTasksFromDB() {
    const docRef = doc(db, "users", "testUser");
    const docSnap = await getDoc(docRef);
    const firestoreTasks = docSnap.data().tasks;
    return firestoreTasks
}


export default loadTasksFromDB;