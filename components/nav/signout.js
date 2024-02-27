import { getAuth, signOut } from "firebase/auth";
import { Logout } from "@mui/icons-material";
import Link from "next/link";


export default function Signout({ setImageUrl }) {

  function HandleClick() {

    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setImageUrl("")
        // Sign-out successful.
        window.alert("signedout");
      })
      .catch((error) => {
        //  error 
        console.log(error);
      });
  
      //handler i annoynym funktion // køres ikke på usestate()
  }
  return (
    <>
      <Link className="nav-link"  href="" onClick={() => {HandleClick()}}> <Logout></Logout> <p>Log ud</p></Link>
    </>
  );
}
