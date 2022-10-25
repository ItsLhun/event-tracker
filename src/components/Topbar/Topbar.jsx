import React, { useRef, useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { createAlertStream } from 'utils';

// you may decrease this if you're feeling brave!
const INTERVAL_DURATION = 2600;

// Topbar using Material UI

const TopbarStyles = styled(BottomNavigation)(({ theme }) => ({
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

const Topbar = (props) => {
  const [value, setValue] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const interval = useRef(null);

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
    <TopbarStyles
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <Box marginBottom={'50px'}>
        <Box position={'absolute'} top={'0px'} left={'0px'}>
          <button disabled={isRunning} onClick={handleStartTapped}>
            start
          </button>
          <button disabled={!isRunning} onClick={handleStopTapped}>
            stop
          </button>
          <button disabled={!props.items.length} onClick={handleClearTapped}>
            clear
          </button>
        </Box>
      </Box>
    </TopbarStyles>
  );
};
export default Topbar;
