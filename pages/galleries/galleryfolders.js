import { useAuthContext } from "@/firebase/auth/authcontext";
import getDoument from "@/firebase/database/getdata";
import Galleryimage from "@/components/ui/galleryimage";
import { useEffect, useState } from "react";
import Search from "@/components/ui/search";
import CircularProgress from "@mui/material/CircularProgress";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { getDocumentPage } from "@/firebase/database/getdata";

///get data from search

///rendering af gallerier --> gallerycontent

export default function Galleryfolders({foldername,id, props}) {
  const [Data, setData] = useState([]);
  const user = useAuthContext();
  let [Query, setQuery] = useState([]);
  let whoami;
  let subarr = [];

  const changeQuery = (f) => {
    setQuery(f);
  };
  ///datachange effect
  useEffect(() => {
    async function getData() {
      const fetch = await getDocumentPage(0);
      setData(props.slice(0,12));
      changeQuery([]);
    }
    getData();
  }, []);

  const handlePage = async function (e,p){
    let offset;
 
    if( p == 1 ){
      setData(props.slice(0,12));
    } else {

      
       let offset = 12*(p-1)
       let offsetarr = props.slice(offset)
       setData(offsetarr);
    }
   
 
    // const fetch = await getDocumentPage(offset);
   
  }

  const names = ["multiplechoice", "interaktiv", "quiz"];

  ///userspecific:

  if (user != null) {
    whoami = user["email"];
    if (Data != null) {
      // console.log(Data.result);
      if (Query.length != 0) {
        return (
          <>

            <div className="frontpage-grid">
              <h1 className="center-h1">Her er hvad vi fandt...</h1>
              {Query.map(function (Query, key = 0) {
                key++;
                return <Galleryimage key={key} props={Query}></Galleryimage>;
              })}
            </div>
          </>
        );
      } else {
      }
      return (
        <>
          {/* <div className="search-panel">
            <Search data={Data} query={changeQuery}></Search>
          </div> */}

          <div className="frontpage-grid-gallery">
           
            <h1>  {foldername}</h1>
            
            <div className="image-grid">
             {/* {console.log(Data.gallery_content)} */}
              {Data.map((element) => {
                subarr.push(element.id);
                return (
                  <>
                  <Galleryimage
                    key={element.id}
                    props={element}
                    id={element.id}
                    user={user}
                  ></Galleryimage>
                  </>
                );
              })}
            </div>
            <Stack className="pagination" spacing={2}>
              <Pagination count={10} color="secondary" onChange={handlePage}  />
            </Stack>
           
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
