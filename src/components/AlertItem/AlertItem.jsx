import { ListItem } from '@mui/material';
import React from 'react';

const Notification = (props) => {
  return (
    <ListItem sx={{ backgroundColor: '#d2ffe7' }}>
      <p>{props.alertData.title}</p>
      <p>{props.alertData.severity}</p>
    </ListItem>
  );
};

export default Notification;
