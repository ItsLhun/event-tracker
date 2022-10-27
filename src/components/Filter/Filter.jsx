import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography
} from '@mui/material';
import { useItems } from 'contexts/ItemsContext';
import React from 'react';
import { capitalizeFirstLetter } from 'utils';
import Constants from '../../Constants';

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

  return (
    <Box
      bgcolor={'white'}
      p={2}
      color={'black'}
      width={'100%'}
      maxWidth={'700px'}
    >
      {/* Types */}
      <Box>
        <Typography variant="h5">Types</Typography>
        <FormGroup row>
          {Constants.ALERTS.map((type) => (
            <FormControlLabel
              key={type}
              control={<Checkbox checked={typesChecked.indexOf(type) !== -1} />}
              label={capitalizeFirstLetter(type)}
              onClick={handleTypesToggle(type)}
            />
          ))}
        </FormGroup>
      </Box>
      {/* Severities */}
      <Box>
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
      {/* Search by text */}
      <Box>
        <Typography variant="h5">Free text</Typography>
        <TextField
          value={freeSearch}
          onChange={(e) => setFreeSearch(e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        onClick={() => {
          console.log('typesChecked', typesChecked);
          handleApplyFilters(
            typesChecked,
            severitiesChecked,
            freeSearch.toLowerCase()
          );
        }}
      >
        Apply
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setTypesChecked([]);
          setSeveritiesChecked([]);
          setFreeSearch('');
          handleApplyFilters([], [], '');
        }}
      >
        Clear
      </Button>
    </Box>
  );
};

export default Filter;
