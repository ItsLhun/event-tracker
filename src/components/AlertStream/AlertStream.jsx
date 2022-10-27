import AlertItem from 'components/AlertItem/AlertItem';
import React from 'react';
import { styled } from '@mui/material/styles';
import { useItems } from 'contexts/ItemsContext';

const StyledAlertItems = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  margin: 'auto',
  padding: '10px',
  width: '100%',
  maxWidth: theme.breakpoints.values.md,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1)
}));

const AlertStream = (props) => {
  const { displayedItems, discardedItems } = useItems();
  return (
    <StyledAlertItems>
      {props.history
        ? discardedItems.map((item) => (
            <AlertItem key={item.key} alertData={item} />
          ))
        : displayedItems.map((item) => (
            <AlertItem key={item.key} alertData={item} />
          ))}
    </StyledAlertItems>
  );
};

export default AlertStream;
