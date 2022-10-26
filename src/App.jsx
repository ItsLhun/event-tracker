import React, { useRef, useState } from 'react';
import AlertStream from './components/AlertStream';
import { createAlertStream } from './utils';
import styled from 'styled-components';
import Navbar from './components/Navbar/Navbar';
import { Box, Select, ThemeProvider } from '@mui/material';
import theme from 'theme';
import Topbar from 'components/Topbar/Topbar';

export default function App() {
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [discardedItems, setDiscardedItems] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" flexDirection="column" height={'100%'}>
        <Topbar items={items} setItems={setItems} />
        <Box flexGrow={1} overflow="auto">
          <AlertStream data={items} />
        </Box>
        <Navbar />
      </Box>
    </ThemeProvider>
  );
}
