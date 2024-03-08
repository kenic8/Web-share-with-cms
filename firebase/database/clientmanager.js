import { forEach } from "@/websharecms/config/middlewares";
import firebase_app from "../config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const db = getFirestore(firebase_app);

// Function to add a liked image for a user
export async function clientMangeradd(userId, clientId ,clientEmail) {
  console.log(userId, clientId);

  try {
    const userDocRef = doc(db, "creators", userId);
    const userDocSnapshot = await getDoc(userDocRef);
    const currentClients = userDocSnapshot.exists()
      ? userDocSnapshot.data().clients || []
      : [];

    if (!currentClients.includes(clientId)) {
      currentClients.push({ clientId: clientId, clientEmail: clientEmail });
    }
    const data = { clients: currentClients };
    const result = await setDoc(userDocRef, data);
    return result;
  } catch (e) {
    return { error: e.message };
  }
}

export async function clientMangerremove(userId, clientId) {
  try {
    const userDocRef = doc(db, "creators", userId);
    const userDocSnapshot = await getDoc(userDocRef);
    const currentClients = userDocSnapshot.exists()
      ? userDocSnapshot.data().clients || []
      : [];

    let clientFound = false;
    const updatedClients = currentClients.filter(client => {
      if (client.clientId === clientId) {
        clientFound = true;
        return false; // Filter out this client
      }
      return true; // Keep all other clients
    });

    if (clientFound) {
      const data = { clients: updatedClients };
      await setDoc(userDocRef, data);
      return { message: "ok", clients : updatedClients };
    } else {
      return { message: "No client found with the given ID" };
    }
  } catch (error) {
    return { error: error.message };
  }
}



export async function getClients(userId) {
  try {
    const userDocRef = doc(db, "creators", userId);

    const userDocSnapshot = await getDoc(userDocRef);

    const currentClients = userDocSnapshot.exists()
      ? userDocSnapshot.data().clients || []
      : [];
     let result = currentClients;
    console.log(result)
    return { result };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getClientdata(userId) {
  console.log(userId)
  try {
    const userDocRef = doc(db, "users", userId);

    const userDocSnapshot = await getDoc(userDocRef);

     let result = userDocSnapshot.data();
    console.log(result)
    return { result };
  } catch (error) {
    return { error: error.message };
  }
}



