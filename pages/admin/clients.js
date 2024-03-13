import { useAuthContext } from "@/firebase/auth/authcontext";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import { getClients } from "@/firebase/database/clientmanager";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import * as React from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import { clientMangerremove } from "@/firebase/database/clientmanager";
import { data } from "autoprefixer";

///get data from search

export default function Clients() {
  const [Data, setData] = useState([]);
  const user = useAuthContext();
  let whoami;

  const handleClick = async (clientid) => {
    console.log(clientid);

    const result = await clientMangerremove(user.uid, clientid);
    if (result.clients) {
      console.log(result.clients)
      // If client removed successfully, update the UI
      setData({result:result.clients});
    }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "username",
      headerName: "Username",
      width: 150,
      editable: false,
    },
    {
      field: "userlink",
      headerName: "User link",
      width: 100,
      renderCell: (link) => (
        <Link href={`/admin/singleclient?id=${link.value}`}>Go to user</Link>
      ),
      editable: false,
    },
    {
      field: "userdelete",
      headerName: "Delete",
      width: 70,
      renderCell: (link) => (
        // <Link href={`/admin/singleclient?id=${link.value}`}>Go to user</Link>
        <div className="remove-icon">
          <PersonRemoveIcon
            onClick={() => handleClick(link.value)}
          ></PersonRemoveIcon>
        </div>
      ),
      editable: false,
    },
  ];

  async function getData() {
    const fetch = await getClients(user.uid);
    setData(fetch);
  }

  useEffect(() => {
    getData();
  }, []);



  if (user != null) {
    const rows = [];
   ///datachange effect
 
   
   
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
                  href={`/admin/adminsignup?id=${user.uid}`}
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
                username: element.clientEmail,
                userlink: element.clientId,
                userdelete: element.clientId,
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
