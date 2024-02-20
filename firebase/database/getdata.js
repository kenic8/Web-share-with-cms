///her skal der laves quries til search fuctionen :
import QueryString from "qs";
import firebase_app from "../config";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  get,
} from "firebase/firestore";

//
const db = getFirestore(firebase_app);

// export default async function getDoument(datacollection, id) {
//   let result = null;
//   let error = null;
//   let data = [];

//   // console.log(datacollection, id);

//   switch (datacollection) {
//     case "all":
//       try {
//         const posts = await getDocs(collection(db, "posts"));
//         posts.forEach((doc) => {
//           // console.log(doc.id, " => ", doc.data());
//           data.push({ id: doc.id, data: doc.data() });
//           result = data;
//         });
//         // console.log(result);
//         return { result };
//       } catch (error) {
//         alert(error);
//       }
//       break;
//     case "single":
//       let docRef = doc(db, "posts", id);
//       try {
//         result = await getDoc(docRef);
//         // console.log(result);
//         if (result.exists()) {
//           // console.log(result.data());
//           result = result.data();
//           return { result };
//         }
//       } catch (e) {
//         error = e;
//       }
//     case "template":
//       try {
//         let dbcollection = collection(db, "posts");
//         let result = await getDocs(
//           query(dbcollection, where("category", "==", "template"))
//         );

//         result.forEach((doc) => {
//           data.push({ id: doc.id, data: doc.data() });
//         });
//         result = data;
//         return { result };

//       } catch (e) {
//         console.error("Error:", e);
//         throw e; // Re-throw the error to handle it in the calling code
//       }
//       case "quiz":
//         try {
//           let dbcollection = collection(db, "posts");
//           let result = await getDocs(
//             query(dbcollection, where("category", "==", "quiz"))
//           );

//           result.forEach((doc) => {
//             data.push({ id: doc.id, data: doc.data() });
//           });
//           result = data;
//           return { result };

//         } catch (e) {
//           console.error("Error:", e);
//           throw e; // Re-throw the error to handle it in the calling code
//         }
//         case "video":
//           try {
//             let dbcollection = collection(db, "posts");
//             let result = await getDocs(
//               query(dbcollection, where("category", "==", "video"))
//             );

//             result.forEach((doc) => {
//               data.push({ id: doc.id, data: doc.data() });
//             });
//             result = data;
//             return { result };

//           } catch (e) {
//             console.error("Error:", e);
//             throw e; // Re-throw the error to handle it in the calling code
//           }

//     default:
//       break;
//   }

//   return { result, error };
// }

export default async function getDocument(id) {
  let result = null;
  let error = null;
  let data = [];

  if (id != null) {
    console.log("single");
    try {
      const response = await fetch(
        `http://localhost:1337/api/content-pages/${id}?populate[0]=content_blocks.Image_content&populate[1]=createdBy&populate[2]=page_tags`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      data = await response.json();
      result = data;
    } catch (err) {
      error = err.message;
    }

    return { result, error };
  } else {
    console.log("all");
    try {
      const response = await fetch(
        `http://localhost:1337/api/content-pages/?populate[0]=content_blocks.Image_content&populate[1]=createdBy&populate[2]=page_tags`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      data = await response.json();
      result = data;
    } catch (err) {
      error = err.message;
    }

    return { result, error };
  }
}


export  async function getDocumentfilter(id) {
  let result = null;
  let error = null;
  let data = [];
  console.log(id)

  if (id != null) {
    console.log("filter");
    try {
      const response = await fetch(
        `http://localhost:1337/api/content-pages/?filters[page_category][$eq]=${id}&populate[0]=content_blocks.Image_content&populate[1]=createdBy&populate[2]=page_tags`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      data = await response.json();
      result = data;
    } catch (err) {
      error = err.message;
    }

    return { result, error };
  } 

}




const qs = QueryString;

const squery = qs.stringify(
  {
    filters:[
      {page_category:{
        $eq:"template"
      }}

    ],
    populate: [
      "content_blocks.Image_content",
      "createdBy",
      "page_tags"
    ],
  },
  {
    encodeValuesOnly: true,
  }
);

console.log(squery)
