import { useAuthContext } from "@/firebase/auth/authcontext";
import getDoument from "@/firebase/database/getdata";
import Carddisplay from "@/components/ui/carddisplay";
import { useEffect, useState } from "react";
import Search from "@/components/ui/search";
import CircularProgress from "@mui/material/CircularProgress";
import WindowIcon from "@mui/icons-material/Window";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Link from "next/link";

///get data from search

export default function FrontPage() {
  const [Data, setData] = useState([]);
  const user = useAuthContext();
  let [Query, setQuery] = useState([]);
  let whoami;

  const changeQuery = (f) => {
    setQuery(f);
  };
  ///datachange effect
  useEffect(() => {
    async function getData() {
      const fetch = await getDoument(null,"content-pages");
      setData(fetch);
      changeQuery([]);
    }
    getData();
  }, []);

  if (user != null) {
    whoami = user["email"];
    if (Data.result != null) {
      // console.log(Data.result);
      if (Query.length != 0) {
        return (
          <>
            <div className="search-panel">
              <Search data={Data} query={changeQuery}></Search>
            </div>

            <div className="frontpage-grid">
              <h1 className="center-h1">Her er hvad vi fandt...</h1>
              {Query.map(function (Query, key = 0) {
                key++;
                return <Carddisplay key={key} props={Query}></Carddisplay>;
              })}
            </div>
          </>
        );
      } else {
      }
      return (
        <>
          <div className="search-panel">
            <Search data={Data} query={changeQuery}></Search>
          </div>

          <div className="frontpage-grid">
            <div className="toggle-view">
              <h5 className="view-heading">Grid/Row</h5>

              <div>
                <Link className="toggle-link" href={"/frontpage/"}>
                  <WindowIcon></WindowIcon>
                </Link>
                <Link className="toggle-link" href={"/frontpage/gridview"}>
                  <FormatListNumberedIcon></FormatListNumberedIcon>
                </Link>
              </div>
            </div>
            <h2 className="center-h1">Alle eksempler</h2>

            {Data.result.map((element) => {
              return (
                <Carddisplay
                  key={element.id}
                  props={element}
                  id={element.id}
                  type={"singlepost"}
                  contenttype={"displaypost"}
                ></Carddisplay>
              );
            })}

            {/* {console.log(Data.result.data)} */}
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
