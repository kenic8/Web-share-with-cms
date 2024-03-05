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
    "Humaira Sims",
    "Santiago Solis",
    "Dawid Floyd",
    "Mateo Barlow",
    "Samia Navarro",
    "Kaden Fields",
    "Genevieve Watkins",
    "Mariah Hickman",
    "Rocco Richardson",
    "Harris Glenn",
  ];

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

          <div className="frontpage-grid">
            <div className="image-gallery-filters">
              <div className="filter-section-1">
                <button> hej </button>
                <button> fafsaf</button>
                <button> saffsa</button>
                <button> fafsaf</button>
              </div>
              <button> saffsa</button>
              <button> fafsaf</button>
              <button> saffsa</button>
              <button> fafsaf</button>
              <button> saffsa</button>
              <div className="filter-section-2">
                <button> fafsaf</button>
                <button> saffsa</button>
                <button> fafsaf</button>
                <button> saffsa</button>
                <button> fafsaf</button>
              </div>
              <div
                className="filet-section-3
              "
              >
                <button> saffsa</button>
                <button> fafsaf</button>
                <button> saffsa</button>
                <button> fafsaf</button>
                <button> saffsa</button>
              </div>
            </div>
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
                    {selected ? <CheckIcon color="info" /> : null}
                  </MenuItem>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Tags"
                    placeholder="Favorites"
                  />
                )}
              />

              <TextField
                className="gallery-search"
                id="outlined-basic"
                label="Search"
                variant="outlined"
                fullWidth={true}
              />
            </div>

            {/* <div className="toggle-view">
              <h5 className="view-heading">Grid/Row</h5>
              <div>
                <Link className="toggle-link" href={"http://localhost:3000/frontpage/"}>
                  <WindowIcon></WindowIcon>
                </Link>
                <Link className="toggle-link" href={"http://localhost:3000/frontpage/gridview"}>
                  <FormatListNumberedIcon></FormatListNumberedIcon>
                </Link>
              </div>
            </div> */}
            <h2 className="center-h1">Alle billeder</h2>

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
