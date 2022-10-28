import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ClearIcon from '@mui/icons-material/Clear';
import AdbIcon from '@mui/icons-material/Adb';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { AppBar, Collapse, IconButton, Typography } from '@mui/material';
import Filter from 'components/Filter/Filter';
import { useItems } from 'contexts/ItemsContext';

const TopbarStyles = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  position: 'relative'
}));

const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.md,
  width: '100%',
  margin: 'auto',
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
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box display={'flex'} flexDirection={'row'}>
          <AdbIcon sx={{ mx: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: 'none', sm: 'flex' },
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
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          p={1}
          alignSelf={'center'}
        >
          <IconButton
            size="large"
            color="inherit"
            aria-label="start"
            disabled={isRunning}
            onClick={handleStartTapped}
          >
            <PlayCircleOutlineIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            aria-label="stop"
            disabled={!isRunning}
            onClick={handleStopTapped}
          >
            <StopCircleIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            aria-label="clear"
            disabled={!items.length}
            onClick={handleClearTapped}
          >
            <ClearIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="filter"
          >
            <Typography
              sx={{
                display: { xs: 'none', sm: 'unset' },
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              FILTER
            </Typography>
            <FilterListIcon />
          </IconButton>
        </Box>
      </StyledBox>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Filter>lorem ipsum</Filter>
        <Box marginLeft={2}>
          <Typography variant="body2">
            {'Total pending items: ' + items.length}
          </Typography>
          <Typography variant="body2">
            {'Displayed items length: ' + displayedItems.length}
          </Typography>
        </Box>
      </Collapse>
    </TopbarStyles>
  );
};
export default Topbar;
