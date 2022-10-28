import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { useItems } from 'contexts/ItemsContext';
import React from 'react';
import { capitalizeFirstLetter } from 'utils';
import Constants from '../../Constants';

const StyledContainerBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  width: '100%',
  maxWidth: theme.breakpoints.values.md,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1)
}));

/**
 * Filter
 * @param {*} props
 * @returns
 */
const Filter = (props) => {
  const { handleApplyFilters } = useItems();
  const [typesChecked, setTypesChecked] = React.useState([]);
  const [severitiesChecked, setSeveritiesChecked] = React.useState([]);
  const [predictionsChecked, setPredictionsChecked] = React.useState([]);
  const [freeSearch, setFreeSearch] = React.useState('');

  const handleTypesToggle = (value) => () => {
    const currentIndex = typesChecked.indexOf(value);
    const newChecked = [...typesChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setTypesChecked(newChecked);
  };

  const handleSeveritiesToggle = (value) => () => {
    const currentIndex = severitiesChecked.indexOf(value);
    const newChecked = [...severitiesChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSeveritiesChecked(newChecked);
  };

  const handlePredictionsToggle = (value) => () => {
    const currentIndex = predictionsChecked.indexOf(value);
    const newChecked = [...predictionsChecked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setPredictionsChecked(newChecked);
  };

  return (
    <StyledContainerBox>
      <Typography variant="h3" component="h1" letterSpacing={'0.3rem'}>
        Filter
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box display={'flex'} flexDirection={'row'} gap={1} flexWrap={'wrap'}>
        {/* Types */}
        <Box marginRight={1}>
          <Typography variant="h5">Types</Typography>
          <FormGroup row>
            {Constants.ALERTS.map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox checked={typesChecked.indexOf(type) !== -1} />
                }
                label={capitalizeFirstLetter(type)}
                onClick={handleTypesToggle(type)}
              />
            ))}
          </FormGroup>
        </Box>
        {/* Prediction */}
        <Box marginRight={1}>
          <Typography variant="h5">Prediction status</Typography>
          <FormGroup row>
            {Constants.PREDICTIONS.map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox checked={predictionsChecked.indexOf(type) !== -1} />
                }
                label={capitalizeFirstLetter(type)}
                onClick={handlePredictionsToggle(type)}
              />
            ))}
          </FormGroup>
        </Box>
        {/* Severities */}
        <Box marginRight={1}>
          <Typography variant="h5">Severity</Typography>
          <FormGroup row>
            {Constants.SEVERITY.map((severity) => (
              <FormControlLabel
                key={severity}
                control={
                  <Checkbox
                    checked={severitiesChecked.indexOf(severity) !== -1}
                  />
                }
                label={severity}
                onClick={handleSeveritiesToggle(severity)}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
      {/* Search by text */}
      <Box>
        <Typography variant="h5">Free text</Typography>
        <TextField
          value={freeSearch}
          onChange={(e) => setFreeSearch(e.target.value)}
          fullWidth
          label="Search..."
          placeholder="Search..."
          margin="normal"
        />
      </Box>
      <Box width="100%" display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={() => {
            handleApplyFilters(
              typesChecked,
              severitiesChecked,
              freeSearch.toLowerCase(),
              predictionsChecked
            );
          }}
          sx={{ mx: 2 }}
        >
          Apply
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setTypesChecked([]);
            setSeveritiesChecked([]);
            setFreeSearch('');
            handleApplyFilters([], [], '', []);
          }}
        >
          Clear
        </Button>
      </Box>
    </StyledContainerBox>
  );
};

export default Filter;
