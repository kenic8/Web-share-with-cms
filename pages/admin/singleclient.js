import { useAuthContext } from "@/firebase/auth/authcontext";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { getClientdata } from "@/firebase/database/clientmanager";
import * as React from "react";
import { useSearchParams } from "next/navigation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GroupsIcon from '@mui/icons-material/Groups';

///get data from search

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function singleClient() {
  const [Data, setData] = useState([]);
  const user = useAuthContext();
  let whoami;
  const rows = [];
  const searchParams = useSearchParams();
  const clientid = searchParams.get("id");

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  ///datachange effect
  useEffect(() => {
    async function getData() {
      const fetch = await getClientdata(clientid);
      setData(fetch);
    }
    getData();
  }, []);

  if (user != null) {
    console.log(Data);
    whoami = user["email"];
    if (Data.result != null) {
      return (
        <>
          <div className="frontpage-grid">
            <h1> Single Profile</h1>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "#158b7b10" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  centered
                  textColor="secondary"
                  indicatorColor="secondary"
                >
                  <Tab label={<FavoriteIcon></FavoriteIcon>} {...a11yProps(0)} ></Tab>
                  <Tab label="Info" {...a11yProps(1)} />
                  <Tab label={<GroupsIcon></GroupsIcon>} {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                liked images
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                User info
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                Groups
              </CustomTabPanel>
            </Box>
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
