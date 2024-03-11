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

export default function Gallery() {
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
      setData(fetch);
      changeQuery([]);
    }
    getData();
  }, []);

  const handlePage = async function (e,p){
    let offset;
    if( p == 1 ){
      offset = 0
    } else {
       offset = 12*(p-1)
    }
   
    const fetch = await getDocumentPage(offset);
    setData(fetch);
  }

  const names = ["multiplechoice", "interaktiv", "quiz"];

  ///userspecific:

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
            <div className="big-imagesearch">
              {/* <Autocomplete
                sx={{ m: 1, width: 500 }}
                multiple
                id="tags-standard"
                options={names}
                getOptionLabel={(option) => option}
                defaultValue={[names[0], names[1]]}
                disableCloseOnSelect
                renderOption={(props, option, { selected }) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{ justifyContent: "space-between" }}
                    {...props}
                  >
                    {option}
                    {selected ? <CheckIcon color="#158B7C" /> : null}
                  </MenuItem>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputLabelProps={{
                      sx: {
                        color: "#158B7C",
                        [`&.${inputLabelClasses.focused}`]: {
                          color: "#158B7C",
                        },
                      },
                    }}
                    variant="outlined"
                    label="Tags"
                    placeholder="Vælg tags"
                  />
                )}
              /> */}

              <TextField
                className="gallery-search"
                id="outlined-basic"
                label="Hvad mangler du?"
                variant="outlined"
                fullWidth={true}
                InputLabelProps={{
                  sx: {
                    "& .MuiOutlinedInput-root": {
                      borderColor: "#042B43",
                      "&  MuiInputLabel-root": { color: "#042B43" },
                      "&.Mui-focused fieldset": {
                        color: "#042B43",
                      },
                    },
                    [`&.${inputLabelClasses.focused}`]: {
                      color: "#158B7C",
                    },
                  },
                }}
              />
            </div>

            <div className="image-grid">
              {Data.result.map((element) => {
                subarr.push(element.id);

                return (
                  <Galleryimage
                    key={element.id}
                    props={element}
                    id={element.id}
                    user={user}
                  ></Galleryimage>
                );
              })}
            </div>
            <Stack className="pagination" spacing={2}>
              <Pagination count={10} color="secondary" onChange={handlePage}  />
            </Stack>
            <div className="image-gallery-filters">
              <div className="content-wrapper-filters">
                <h3> Filter muligheder</h3>
                <div className="filter-applied">
                  <h4>Aktive filtre</h4>
                  <fieldset id="fieldset">
                    <legend>Vælg tags</legend>
                    <div className="tags checkbox">
                      <label htmlFor="tagtemplate"> Html </label>
                      <input
                        type="checkbox"
                        id="tagkode"
                        name="tagtemkode"
                        value="kode"
                        className="switch"
                      ></input>
                      <label htmlFor="tagquiz"> Iteraktiv </label>
                      <input
                        type="checkbox"
                        id="taginteraktiv"
                        name="interaktiv"
                        value="interaktiv"
                        className="switch"
                      ></input>
                      <label htmlFor="tagvideo"> Multichoice </label>
                      <input
                        type="checkbox"
                        id="tagmultiplechoice"
                        name="tagmultiplechoice"
                        value="multiplechoice"
                        className="switch"
                      ></input>
                    </div>
                  </fieldset>
                  <div className="filter-section-1">
                    <button className="button-a"> Red </button>
                    <button className="button-a"> SVG</button>
                    <button className="button-a"> RAW</button>
                  </div>
                </div>
                <div className=" asset-type">
                  <h4>Type</h4>
                  <div className="filter-section-2">
                    <button className="button-b">Video</button>
                    <button className="button-b"> Icons</button>
                    <button className="button-b"> Photo</button>
                  </div>
                </div>
                <div className="file-type">
                  <h4>Fil Type</h4>
                  <div className="filter-section-3">
                    <button className="button-c"> JPG</button>
                    <button className="button-c"> AI</button>
                    <button className="button-c"> EPS</button>
                    <button className="button-c"> PNG</button>
                    <button className="button-c"> RAW</button>
                  </div>
                </div>
              </div>
            </div>
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
