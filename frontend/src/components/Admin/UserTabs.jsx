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
import UserTable from "./UserTable";
import FrenchiseTable from "./FrenchiseTable";
import SecondCountryTable from "./SecondCountryTable";
import PromotionalTable from "./PromotionalTable";
import ExtraLinkTable from "./ExtraLinkTable";
import FileTable from "./FileTable";

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


export default function UserTabs() {
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
          <Tab label="PARTNER MANAGEMENT" {...a11yProps(0)} />
          <Tab label="FRECHISE MANAGEMENT" {...a11yProps(1)} />
          <Tab label="COUNTRY MANAGEMENT" {...a11yProps(2)} />
          <Tab label="PROMOTIONAL MANAGEMENT" {...a11yProps(3)} />
          <Tab label="EXTRA NAV" {...a11yProps(4)} />
          <Tab label="FILE/TEMPLATE" {...a11yProps(5)} />





        </Tabs>
      </AppBar>
      </ThemeProvider>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
           <UserTable />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
           <FrenchiseTable />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
           <SecondCountryTable />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
           <PromotionalTable />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
           <ExtraLinkTable />
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
           <FileTable />
        </TabPanel>
      
      
      </SwipeableViews>
    </Box>
   
  );
}
