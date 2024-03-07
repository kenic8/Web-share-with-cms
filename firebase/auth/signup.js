import { firebase_app, firestore, ref, uploadBytesResumable } from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { clientMangeradd } from "../database/clientmanager";

const auth = getAuth(firebase_app);

// console.log(auth);
const firestoredb = firestore;
const firestorref = ref;
const upload = uploadBytesResumable;

export default async function signUp(email, password, image) {
  [];

  let result = null,
    error = null;
  const metadata = {
    contentType: "image/jpeg",
  };
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    // console.log(result);
    if (image) {
      console.log(firestoredb);
      // const firestorage = firestoredb.ref();
      const profileimageRef = firestorref(firestoredb, `${result.user.uid}`);
      const imagesRef = firestorref(
        firestoredb,
        `profileImages/${result.user.uid}`
      );
      console.log(profileimageRef);
      console.log(imagesRef);
      upload(imagesRef, image, metadata);
    }

    ///createuserdoc in storage with
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function adminsignUp(email, password, clientowner) {
  [];

  let result = null,
    error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
      if (result) {
        clientMangeradd(clientowner, result.user.uid,email);
      }

    ///createuserdoc in storage with
  } catch (e) {
    error = e;
  }

  return { result, error };
}
