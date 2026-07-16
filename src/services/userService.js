import { db } from "../firebase-init";
import { doc, getDoc } from "firebase/firestore";

export async function getCurrentUserProfile(uid) {

    const docRef = doc(db, "users", uid);

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
        console.warn("User profile not found:", uid);
        return null;
    }

    return {
        id: snapshot.id,
        ...snapshot.data()
    };

}