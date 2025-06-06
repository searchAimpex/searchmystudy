import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import {Box}from "@mui/material"// theme.js
import {ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import BannerTable from "./BannerTable";
import ServiceTable from "./ServiceTable";
import TestimonialTable from "./TestimonialTable";
import CounsellorTable from "./CounsellorTable";
import CountryTable from "./CountryTable";
import ProvinceTable from "./ProvinceTable";
import UniversityTable from "./UniversityTable";
import CourseTable from "./CourseTable";

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


export default function CourseTab() {
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
          <Tab label="COUNTRY MANAGEMENT" {...a11yProps(0)} />
          <Tab label="PROVINCE MANAGEMENT" {...a11yProps(1)} />
          <Tab label="UNIVERSITY MANAGMENT" {...a11yProps(2)} />
          <Tab label="COURSE MANAGMENT" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      </ThemeProvider>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <CountryTable />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <ProvinceTable />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
             <UniversityTable />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
              <CourseTable />
        </TabPanel>
      </SwipeableViews>
    </Box>
   
  );
}