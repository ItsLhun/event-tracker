import AlertItem from 'components/AlertItem/AlertItem';
import React from 'react';
import { styled } from '@mui/material/styles';
// Data available
// ------------------
// The alert data is generated using the Chance library.
// The definitions can be seen below.
// ------------------
// key: chance.guid(),
// title: chance.sentence({ words: 5 }),

// severity: chance.integer({ min: 1, max: 5 }), (1 = highest, 5 = lowest)

// type: chance.pickone(["mechanical", "software", "human"]),

// isPrediction: chance.pickone([true, false]),

// predictionConfidence: chance.integer({ min: 70, max: 99 }), (99% = almost certain to happen)

// description: chance.paragraph({ sentences: 2 }),

// time: new Date()

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

const AlertStream = ({ data }) => (
  <StyledAlertItems>
    {data.map((item) => (
      <AlertItem key={item.key} alertData={item} />
    ))}
  </StyledAlertItems>
);

export default AlertStream;
