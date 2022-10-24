import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { styled } from '@mui/material/styles';

// Navbar using Material UI

const NavbarStyles = styled(BottomNavigation)(({ theme }) => ({
  flexShrink: 0,
  backgroundColor: theme.palette.primary.main
}));

const ActionStyles = styled(BottomNavigationAction)(({ theme }) => ({
  color: theme.palette.primary.contrastText,

  '&.Mui-selected': {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.contrastText
  }
}));

const Navbar = () => {
  const [value, setValue] = React.useState(0);

  return (
    <NavbarStyles
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <ActionStyles label="Home" icon={<HomeIcon />} />
      <ActionStyles label="History" icon={<ManageHistoryIcon />} />
    </NavbarStyles>
  );
};
export default Navbar;
