import { ListItem, styled, Typography, useTheme } from '@mui/material';
import React from 'react';

const backgroundColor = (props) => {
  const { severity } = props;
  switch (severity) {
    case 1:
      return '#ff0000';
    case 2:
      return '#ff6600';
    case 3:
      return '#ffcc00';
    case 4:
      return '#99ff00';
    case 5:
      return '#00ff00';
    default:
      return '#ff0000';
  }
};

const StyliedListItem = styled(ListItem)((props) => ({
  // backgroundColor: props.alertData.type === 'software' ? 'red' : 'green',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
  position: 'relative',
  width: '100%'
}));

const Notification = (props) => {
  const theme = useTheme();
  return (
    <StyliedListItem alertData={props.alertData} theme={theme}>
      <Typography variant="h5" component="h2">
        {props.alertData.title}
      </Typography>
      <p> prediction:{props.alertData.isPrediction} </p>
      <p>{props.alertData.severity}</p>
      <p>{props.alertData.type}</p>
    </StyliedListItem>
  );
};

export default Notification;
