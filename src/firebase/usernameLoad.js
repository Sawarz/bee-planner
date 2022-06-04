import { app } from './app'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

let db = getFirestore(app);
let auth = getAuth(app);

async function loadUsername() {
    const docRef = doc(db, "users", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);
    const username = docSnap.data().username;
    return username;
}


export default loadUsername;