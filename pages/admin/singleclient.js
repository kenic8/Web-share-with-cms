import { useAuthContext } from "@/firebase/auth/authcontext";
import getDoument from "@/firebase/database/getdata";
import Carddisplay from "@/components/ui/carddisplay";
import { useEffect, useState } from "react";
import Search from "@/components/ui/search";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { getClients } from "@/firebase/database/clientmanager";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import * as React from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import WindowIcon from "@mui/icons-material/Window";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { query } from "firebase/firestore";

///get data from search

export default function singleClient() {
  const [Data, setData] = useState([]);
  const user = useAuthContext();
  let whoami;

  

  const rows = [];

  
  ///datachange effect
  useEffect(() => {
    async function getData() {
      const fetch = await getClients(user.uid);
      setData(fetch);
    }
    getData();
  }, []);

  if (user != null) {

    console.log(Data)
    whoami = user["email"];
    if (Data.result != null) {
      return (
        <>
          <div className="frontpage-grid">
            <h1> single client page</h1>
          </div>
         
        </>
      );
    } else {
      return (
        <>
          <div className="frontpage-grid">
            <CircularProgress color="inherit" />
          </div>
        </>
      );
    }
  } else whoami = "Du er ikke logget ind ";
  return (
    <>
      <div className="frontpage-grid">
        <h1>{whoami} </h1>
      </div>
    </>
  );
}
