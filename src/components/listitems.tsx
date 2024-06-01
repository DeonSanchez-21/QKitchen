import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Tab, Tabs } from '@mui/material';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export const MainListItems = ({value, setValue, open}) => {

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
    orientation="vertical"
    value={value}
    onChange={handleChange}
    aria-label="Vertical tabs example"
    sx={{ borderRight: 1, borderColor: 'divider' }}
    >
      <Tab sx={{minWidth: '100%'}} iconPosition= 'start' icon={<DashboardIcon/>} label={open && 'DashBoard'} {...a11yProps(0)}/>
      <Tab sx={{minWidth: '100%'}} iconPosition= 'start' icon={<DashboardIcon/>} label={open && 'Exercises'} {...a11yProps(1)} /> 
      <Tab sx={{minWidth: '100%'}} iconPosition= 'start' icon={<DashboardIcon/>} label={open && 'MealPlan'} {...a11yProps(2)} />
    </Tabs>
  )
}
  


export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>   
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);