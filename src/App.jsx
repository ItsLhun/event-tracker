import React, { useEffect, useRef, useState } from 'react';
import AlertStream from './components/AlertStream';
import { createAlertStream } from './utils';
import styled from 'styled-components';
import Navbar from './components/Navbar/Navbar';
import { Box, Select, ThemeProvider } from '@mui/material';
import theme from 'theme';
import Topbar from 'components/Topbar/Topbar';

const DebugNav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
`;

const BriefWrap = styled.div`
  padding: 1rem;
  background: #d2ffe7;
  margin-top: 2rem;
  text-align: left;
`;

export default function App() {
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const interval = useRef(null);

  // clear the alert stream
  // function handleClearTapped() {
  //   setItems([]);
  // }

  // start the alert stream
  // function handleStartTapped() {
  //   if (!interval.current) {
  //     setIsRunning(true);
  //     interval.current = createAlertStream({
  //       onNewAlert: setItems,
  //       intervalDuration: INTERVAL_DURATION
  //     });
  //   }
  // }

  // stop the alert stream
  // function handleStopTapped() {
  //   if (interval.current) {
  //     interval.current();
  //     interval.current = null;
  //     setIsRunning(false);
  //   }
  // }

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  // start the alert stream on mount
  // useEffect(() => {
  //   if (!interval.current) {
  //     interval.current = createAlertStream({
  //       onNewAlert: setItems,
  //       intervalDuration: INTERVAL_DURATION
  //     });
  //     setIsRunning(true);
  //   }
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" flexDirection="column" height={'100%'}>
        <Box flexGrow={1} overflow="auto">
          <Topbar items={items} setItems={setItems} />
          {/* <Box marginBottom={'50px'}>
            <DebugNav>
              <button disabled={isRunning} onClick={handleStartTapped}>
                start
              </button>
              <button disabled={!isRunning} onClick={handleStopTapped}>
                stop
              </button>
              <button disabled={!items.length} onClick={handleClearTapped}>
                clear
              </button>
            </DebugNav>
          </Box> */}

          <AlertStream data={items} />
        </Box>
        {/* Filter */}
        {showFilter && (
          <Box>
            <Select>
              <option value="all">All</option>
              <option value="mechanical">Mechanical</option>
              <option value="software">Software</option>
            </Select>
          </Box>
        )}
        <Navbar />
      </Box>
    </ThemeProvider>
  );
}
