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

export default function Clients() {
  const [Data, setData] = useState([]);
  const user = useAuthContext();
  let whoami;

  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "username",
      headerName: "username",
      width: 150,
      editable: false,
    },
    {
        field: "userlink",
        headerName: "userlink",
        width: 200,
        renderCell: (link) => (
          <Link href={`http://localhost:3000/admin/singleclient?id=${link.value}`}>Go to user</Link>
        ),
        editable: false,
      },
  ];

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
            <div className="toggle-view">
              <h5 className="view-heading">Tilføj Client</h5>

              <div>
                <Link
                  className="toggle-link"
                  href={`http://localhost:3000/admin/adminsignup?id=${user.uid}`}
                  query={user.id}
                
                >
                  <PersonAddIcon></PersonAddIcon>
                </Link>
              </div>
            </div>
            <h2 className="center-h1">Dine clienter </h2>

            <Box sx={{ height: 350, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
            {Data.result.map((element) => {

              console.log("element");
              const itemobj = {
                id: element.clientId,
                username:element.clientEmail,
                userlink:element.clientId
                
              };
              rows.push(itemobj);
            })}
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
