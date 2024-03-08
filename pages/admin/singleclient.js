import { useAuthContext } from "@/firebase/auth/authcontext";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { getClientdata } from "@/firebase/database/clientmanager";
import * as React from "react";
import { useSearchParams } from "next/navigation";


///get data from search

export default function singleClient() {
  const [Data, setData] = useState([]);
  const user = useAuthContext();
  let whoami;
  const rows = [];
  const searchParams = useSearchParams();
  const clientid = searchParams.get("id");


  ///datachange effect
  useEffect(() => {
    async function getData() {
      const fetch = await getClientdata(clientid);
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
