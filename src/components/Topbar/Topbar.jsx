import React, { useRef, useEffect, useState } from 'react';

import FilterListIcon from '@mui/icons-material/FilterList';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ClearIcon from '@mui/icons-material/Clear';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { createAlertStream } from 'utils';
import {
  AppBar,
  Button,
  CardContent,
  Collapse,
  IconButton
} from '@mui/material';

// you may decrease this if you're feeling brave!
const INTERVAL_DURATION = 1000;

// Topbar using Material UI

const TopbarStyles = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  position: 'relative'
}));

const ToggleButtonStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: 'black'
}));

const Topbar = (props) => {
  const [value, setValue] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const interval = useRef(null);
  const [expanded, setExpanded] = React.useState(false);

  // clear the alert stream
  function handleClearTapped() {
    props.setItems([]);
  }

  // start the alert stream
  function handleStartTapped() {
    if (!interval.current) {
      setIsRunning(true);
      interval.current = createAlertStream({
        onNewAlert: props.setItems,
        intervalDuration: INTERVAL_DURATION
      });
    }
  }

  // stop the alert stream
  function handleStopTapped() {
    if (interval.current) {
      interval.current();
      interval.current = null;
      setIsRunning(false);
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // start the alert stream on mount
  useEffect(() => {
    if (!interval.current) {
      interval.current = createAlertStream({
        onNewAlert: props.setItems,
        intervalDuration: INTERVAL_DURATION
      });
      setIsRunning(true);
    }
  }, []);

  return (
    <TopbarStyles>
      <Box>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          aria-label="start"
          disabled={isRunning}
          onClick={handleStartTapped}
        >
          <PlayCircleOutlineIcon /> Start
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
          <StopCircleIcon /> Stop
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          aria-label="clear"
          disabled={!props.items.length}
          onClick={handleClearTapped}
        >
          <ClearIcon /> Clear
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

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>lorem ipsum</CardContent>
      </Collapse>
    </TopbarStyles>
  );
};
export default Topbar;
