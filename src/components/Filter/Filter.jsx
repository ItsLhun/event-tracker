import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
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

  const handleToggle = (value) => () => {
    const currentIndex = typesChecked.indexOf(value);
    const newChecked = [...typesChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setTypesChecked(newChecked);
  };

  return (
    <Box
      bgcolor={'white'}
      p={2}
      color={'black'}
      width={'100%'}
      maxWidth={'700px'}
    >
      {/* Checkbox out of the three types */}
      <Typography variant="h5">Types</Typography>
      <FormGroup row>
        {Constants.ALERTS.map((type) => (
          <FormControlLabel
            key={type}
            control={<Checkbox checked={typesChecked.indexOf(type) !== -1} />}
            label={capitalizeFirstLetter(type)}
            onClick={handleToggle(type)}
          />
        ))}
      </FormGroup>

      {/* <Typography variant="h5">Severity</Typography> */}
      {/* <FormGroup row>
        <FormControlLabel
          control={<Checkbox />}
          label={Constants.SEVERITY[0]}
          value={Constants.SEVERITY[0]}
        />
        <FormControlLabel
          control={<Checkbox />}
          label={Constants.SEVERITY[1]}
          value={Constants.SEVERITY[1]}
        />
        <FormControlLabel
          control={<Checkbox />}
          label={Constants.SEVERITY[2]}
          value={Constants.SEVERITY[2]}
        />
        <FormControlLabel
          control={<Checkbox />}
          label={Constants.SEVERITY[3]}
          value={Constants.SEVERITY[3]}
        />
        <FormControlLabel
          control={<Checkbox />}
          label={Constants.SEVERITY[4]}
          value={Constants.SEVERITY[4]}
        />
      </FormGroup> */}
      <Button
        variant="contained"
        onClick={() => {
          console.log('typesChecked', typesChecked);
          handleApplyFilters(typesChecked, []);
        }}
      >
        Apply
      </Button>
    </Box>
  );
};

export default Filter;
