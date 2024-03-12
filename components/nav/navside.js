import Link from "next/link";
import Signout from "@/components/nav/signout";
import { useAuthContext } from "@/firebase/auth/authcontext";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import CollectionsIcon from '@mui/icons-material/Collections';
import LoginIcon from "@mui/icons-material/Login";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useEffect, useState } from "react";
import {
  firestore,
  ref,
  getDownloadURL,
} from "@/firebase/config";



export default function Navside({ children }) {
  const user = useAuthContext();
  const greeting = user ? user["email"] : "";
  const [imageUrl, setImageUrl] = useState("");
  const firestoredb = firestore;
  const firestorref = ref;
  const getDownload = getDownloadURL;


  useEffect(() => {
    if (typeof user != "undefined" && user != null) {
      const imagesRef = firestorref(
        firestoredb,
        `profileImages/${user.uid}`
      );
        getDownload(imagesRef)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.error("Error getting download URL:", error);
        });
    }
  }, [imageUrl,user]);

  return (
    <>
      <aside className="nav">
        <div className="profile-top-section">
          {imageUrl && (
            <img src={imageUrl} className="Profile-image" alt="profileimage" />
          )}
          <h4>{greeting}</h4>
        </div>
        <div className="sideNavigation">
          <h3 className="nav-info"> Dashboard</h3>
          {/* Toplayer --> sub catagories --> subcategories  */}
          <Link className="nav-link" href="/">
            <HomeIcon></HomeIcon>
            <p>Home</p>
          </Link>
          <Link className="nav-link" href="/galleries">
          <CollectionsIcon></CollectionsIcon>
          <p>Galleri</p>
        </Link>
          <Link className="nav-link" href="/frontpage">
            <RemoveRedEyeIcon></RemoveRedEyeIcon>
            <p>Opslag</p>
          </Link>
          <Link className="nav-link" href="/components">
            <DashboardIcon></DashboardIcon>
            <p>Kategorier</p>
          </Link>
         
          {/* <Link className="nav-link" href="/createpost">
            <AddBoxIcon></AddBoxIcon>
            <p>Create</p>
          </Link> */}
          <h3 className="nav-info">Interactions</h3>
          <Link
            className="nav-link"
            href="http://192.168.88.201:8080/admin/auth/login"
            target="blank"
          >
            <AddBoxIcon></AddBoxIcon>
            <p>Create</p>
          </Link>
          <Link className="nav-link" href="/admin/clients">
            <AdminPanelSettingsIcon></AdminPanelSettingsIcon>
            <p>Admin</p>
          </Link>

          {user == null ? (
            <Link className="nav-link" href="/signin">
              <LoginIcon />
              <p>Login</p>
            </Link>
          ) : null}
          {user != null ? <Signout setImageUrl={setImageUrl} ></Signout> : null}
        </div>
      </aside>
    </>
  );
}
