import firebase_app from "../config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const db = getFirestore(firebase_app);

// Function to add a liked image for a user
export async function clientManger(userId, clientId) {
  console.log(userId, imageId);

  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);
    const currentClients = userDocSnapshot.exists()
      ? userDocSnapshot.data().clients || []
      : [];

    if (!currentClients.includes(clientId)) {
      currentClients.push(clientId);
    }

    const data = { clients: currentClients };
    const result = await setDoc(userDocRef, data);

    return result;
  } catch (e) {
    return { error: e.message };
  }
}

export async function getClients(userId, clientId) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);
    const currentClients = userDocSnapshot.exists()
      ? userDocSnapshot.data().clients || []
      : [];
    result = currentClients;
    return result;
  } catch (error) {
    return { error: e.message };
  }
}
