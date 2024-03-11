import { firebase_app, firestore, ref, uploadBytesResumable } from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { clientMangeradd } from "../database/clientmanager";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebase_app);

// console.log(auth);
const firestoredb = firestore;
const firestorref = ref;
const upload = uploadBytesResumable;

export default async function signUp(email, password, image) {
  const db = getFirestore(firebase_app);
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
      if (result){
        const data = {
          userdata: {
          userid:result.user.uid,
          email:result.user.email,
          auth:"creator"
        },
          likedImages: [],
        };
        //createuserdoc based on user
        setDoc(doc(db, "users", result.user.uid), data, {
          merge: true,
        });

      }
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
    const db = getFirestore(firebase_app);
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    if (result) {
      clientMangeradd(clientowner, result.user.uid, email);
      const data = {
        userdata: {userid:result.user.uid,
        email:result.user.email,
        Userowner:clientowner, 
        auth:"user"
      },
        likedImages: [],
      };
      //createuserdoc based on user
      setDoc(doc(db, "users", result.user.uid), data, {
        merge: true,
      });
    }

    ///createuserdoc in storage with
  } catch (e) {
    error = e;
  }

  return { result, error };
}
