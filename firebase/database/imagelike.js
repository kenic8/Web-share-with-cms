import firebase_app from "../config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const db = getFirestore(firebase_app);

// Function to add a liked image for a user
export async function likeImage(userId, imageId) {
  console.log(userId, imageId);

  try {
    // Fetch the existing user document
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    // Get the current likedImages array or create an empty array if it doesn't exist
    const currentLikedImages = userDocSnapshot.exists()
      ? userDocSnapshot.data().likedImages || []
      : [];

    // Add the new imageId to the likedImages array if it's not already present
    if (!currentLikedImages.includes(imageId)) {
      currentLikedImages.push(imageId);
    }

    // Update the document with the merged likedImages array
    const data = { likedImages: currentLikedImages };
    const result = await setDoc(userDocRef, data);

    return result;
  } catch (e) {
    return { error: e.message };
  }
}

// Function to retrieve liked images for a user
export async function getLikedImages(userId, imageId) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);
    const currentLikedImages = userDocSnapshot.exists()
      ? userDocSnapshot.data().likedImages || []
      : [];
    result = currentLikedImages;
    return result;
  } catch (error) {
    return { error: e.message };
  }
}
export async function removeLikedImage(userId, imageId) {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);
      const currentLikedImages = userDocSnapshot.exists()
        ? userDocSnapshot.data().likedImages || []
        : [];
  
      if (currentLikedImages.includes(imageId)) {
        console.log(currentLikedImages.includes(imageId));
        console.log("before", currentLikedImages);
  
    
        const updatedLikedImages = currentLikedImages.filter(
          (id) => id !== imageId
        );
  
        console.log("after", updatedLikedImages);
        const data = { likedImages: updatedLikedImages };
        const result = await setDoc(userDocRef, data);
  
        return result;
      } else {
    
        return { message: "Image ID not found in liked images" };
      }
    } catch (error) {
      return { error: error.message };
    }
  }
  
