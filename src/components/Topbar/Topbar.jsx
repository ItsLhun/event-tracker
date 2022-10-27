import React, { useState } from 'react';

import FilterListIcon from '@mui/icons-material/FilterList';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ClearIcon from '@mui/icons-material/Clear';
import AdbIcon from '@mui/icons-material/Adb';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import {
  AppBar,
  Button,
  Collapse,
  IconButton,
  Typography
} from '@mui/material';
import Filter from 'components/Filter/Filter';
import { useItems } from 'contexts/ItemsContext';

const TopbarStyles = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  position: 'relative'
}));

const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.md,
  width: '100%',
  justifyContent: 'space-between'
}));

const Topbar = (props) => {
  const {
    items,
    displayedItems,
    handleStartTapped,
    handleStopTapped,
    handleClearTapped,
    isRunning
  } = useItems();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <TopbarStyles>
      <StyledBox
        width={'700px'}
        mx={'auto'}
        display={'flex'}
        alignItems={'center'}
      >
        <Box display={'flex'} flexDirection={'row'}>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            LOGO
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection={'row'}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            aria-label="start"
            disabled={isRunning}
            onClick={handleStartTapped}
          >
            <PlayCircleOutlineIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            aria-label="stop"
            disabled={!isRunning}
            onClick={handleStopTapped}
          >
            <StopCircleIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            aria-label="clear"
            disabled={!items.length}
            onClick={handleClearTapped}
          >
            <ClearIcon />
          </IconButton>
        </Box>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="filter"
        >
          <FilterListIcon />
        </IconButton>
      </StyledBox>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Filter>lorem ipsum</Filter>
        {'Items length: ' + items.length}
        {'Displayed items length: ' + displayedItems.length}
      </Collapse>
    </TopbarStyles>
  );
};
export default Topbar;
