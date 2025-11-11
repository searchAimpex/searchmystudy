import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// theme.js
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import BannerTable from "./BannerTable";
import ServiceTable from "./ServiceTable";
import TestimonialTable from "./TestimonialTable";
import CounsellorTable from "./CounsellorTable";
import WebinarTable from "./WebinarTable";
import MediaTable from "./MediaTable";
import NotificationTable from "./NotificationTable";
import UserTable from "./UserTable";
import VideoTable from "./VideoTable";

const theme = createTheme({
    palette: {
        background: {
            paper: '#9C2949',
        },
        customColor: {
            main: '#fffff',
        },
    },
  });
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, bgcolor: 'customColor.main' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}


export default function WebTabs() {
//   const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    
    <Box sx={{ width: "100%" }}>
         <ThemeProvider theme={theme}>
      <AppBar  sx={{ bgcolor: 'background.paper'}} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="BANNER MANAGEMENT" {...a11yProps(0)} />
          <Tab label="SERVICE MANAGEMENT" {...a11yProps(1)} />
          <Tab label="COUNSELLOR MANAGMENT" {...a11yProps(2)} />
          <Tab label="TESTIMONIAL MANAGMENT" {...a11yProps(3)} />
          <Tab label="WEBINAR MANAGMENT" {...a11yProps(4)} />
          <Tab label="MEDIA MANAGMENT" {...a11yProps(5)} />
          <Tab label="VIDEO MANAGMENT" {...a11yProps(6)} />




        </Tabs>
      </AppBar>
      </ThemeProvider>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
           <BannerTable />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <ServiceTable />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            <TestimonialTable />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
            <CounsellorTable />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
            <WebinarTable />
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
            <MediaTable />
        </TabPanel>
        <TabPanel value={value} index={6} dir={theme.direction}>
            <VideoTable />
        </TabPanel>
      
      
      
      </SwipeableViews>
    </Box>
   
  );
}
