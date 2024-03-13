import { useAuthContext } from "@/firebase/auth/authcontext";
import getDoument from "@/firebase/database/getdata";
import Carddisplay from "@/components/ui/carddisplay";
import { useEffect, useState } from "react";
import Search from "@/components/ui/search";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import WindowIcon from "@mui/icons-material/Window";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { query } from "firebase/firestore";

///get data from search

export default function Gridview() {
  const [Data, setData] = useState([]);
  const user = useAuthContext();
  let [Query, setQuery] = useState([]);
  let whoami;

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "Creator",
      headerName: "Creator",
      width: 150,
      editable: false,
    },
    {
      field: "Page_heading",
      headerName: "Gallery name",
      width: 200,
      editable: false,
    },
    {
      field: "Created_at",
      headerName: "Created_at",
      type: "string",
      width: 200,
      editable: false,
    },
    {
      field: "Updated_at",
      headerName: "Updated_at",
      type: "string",
      width: 250,
      editable: false,
    },
    {
      field: "Link",
      headerName: "Page link",
      width: 200,
      renderCell: (link) => (
        <Link href={`http://localhost:3000/${link.value}`}>Go to post</Link>
      ),
      editable: false,
    },
  ];

  const rows = [];

  const changeQuery = (f) => {
    setQuery(f);
  };
  ///datachange effect
  useEffect(() => {
    async function getData() {
      const fetch = await getDoument(null,"media-galleries");
      setData(fetch);
      changeQuery([]);
    }
    getData();
  }, []);

  if (user != null) {
    whoami = user["email"];
    if (Data.result != null) {
      return (
        <>
          <div className="search-panel">
            <Search data={Data} query={changeQuery}></Search>
          </div>

          <div className="frontpage-grid">
            <div className="toggle-view">
              <h5 className="view-heading">Grid/Row</h5>

              <div>
                <Link
                  className="toggle-link"
                  href={"/galleries/"}
                >
                  <WindowIcon></WindowIcon>
                </Link>
                <Link
                  className="toggle-link"
                  href={"/galleries/gridview"}
                >
                  <FormatListNumberedIcon></FormatListNumberedIcon>
                </Link>
              </div>
            </div>
            <h2 className="center-h1">Alle eksempler </h2>

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
              console.log(element)
              const itemobj = {
                id: element.id,
                Page_heading: element.gallery_heading,
                Creator: element.created_by.firstname,
                Link: `galleries/gallery?id=${element.id}`,
                Created_at: element.created_at,
                Updated_at: element.updated_at,
              };
              rows.push(itemobj);
            })}
          </div>
          {Query.length != 0  ? (
            <>
              <div className="frontpage-grid">
                <h1 className="center-h1">Her er hvad vi fandt...</h1>
                {Query.map(function (Query, key = 0) {
                  key++;
                  return <Carddisplay key={key} props={Query}></Carddisplay>;
                })}
              </div>
            </>
          ) : null}
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
