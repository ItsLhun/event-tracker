import React, { useState } from 'react';
import AlertStream from './components/AlertStream';
import Navbar from './components/Navbar/Navbar';
import { Box, ThemeProvider } from '@mui/material';
import theme from 'theme';
import Topbar from 'components/Topbar/Topbar';
import { ItemsProvider } from 'contexts/ItemsContext';

export default function App() {
  const [items, setItems] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <ItemsProvider>
        <Box display="flex" flexDirection="column" height={'100%'}>
          <Topbar items={items} setItems={setItems} />
          <Box flexGrow={1} overflow="auto">
            <AlertStream />
          </Box>
          <Navbar />
        </Box>
      </ItemsProvider>
    </ThemeProvider>
  );
}
