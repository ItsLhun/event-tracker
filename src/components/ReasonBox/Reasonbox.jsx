import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Box } from '@mui/system';

const ReasonIcon = (props) => {
  const { reason } = props;
  return reason.toLowerCase() === 'discard' ? (
    <DeleteForeverIcon fontSize="large" />
  ) : (
    <AddTaskIcon fontSize="large" />
  );
};

const Reasonbox = (props) => {
  const { reason } = props;
  return (
    <Box alignSelf={'flex-end'}>
      <ReasonIcon reason={reason} />
    </Box>
  );
};

export default Reasonbox;
