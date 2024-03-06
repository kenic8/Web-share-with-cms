import { useAuthContext } from "@/firebase/auth/authcontext";
import getDoument from "@/firebase/database/getdata";
import Carddisplay from "@/components/ui/carddisplay";
import Galleryimage from "@/components/ui/galleryimage";
import { useEffect, useState } from "react";
import Search from "@/components/ui/search";
import CircularProgress from "@mui/material/CircularProgress";
import WindowIcon from "@mui/icons-material/Window";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Link from "next/link";
import { inputLabelClasses } from "@mui/material/InputLabel";
import {
  Stack,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Chip,
  Select,
  FormControl,
  Autocomplete,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

///get data from search

export default function Gallery() {
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
      const fetch = await getDoument();
      setData(fetch);
      changeQuery([]);
    }
    getData();
  }, []);

  const names = [
    "quiz",
    "kode",
    "interaktiv",
    
  ];

  const style = {};

  if (user != null) {
    whoami = user["email"];
    if (Data.result != null) {
      console.log(Data.result);
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
              <Autocomplete
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
              />

              <TextField
                className="gallery-search"
                id="outlined-basic"
                label="Hvad mangler du?"
                variant="outlined"
                fullWidth={true}
                InputLabelProps={{
                  sx: {

                    "& .MuiOutlinedInput-root": {
                      borderColor: "#158B7C",
                      "&  MuiInputLabel-root": { color: "#158B7C" },
                      "&.Mui-focused fieldset": {
        
                        color: "#158B7C",
                      }
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
                return (
                  <Galleryimage
                    key={element.id}
                    props={element}
                    id={element.id}
                  ></Galleryimage>
                );
              })}

              {/* {console.log(Data.result.data)} */}
            </div>
            <div className="image-gallery-filters">
              <div className="content-wrapper-filters">
                <h3> Filter muligheder</h3>
                <div className="filter-applied">
                  <h4>Aktive filtre</h4>
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
