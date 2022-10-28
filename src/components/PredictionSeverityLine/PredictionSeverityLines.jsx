import { Box, styled } from '@mui/system';
import React from 'react';
import { severityBackgroundColor } from 'utils';

const StyledSeverityLine = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'position' && prop !== 'severity'
})(
  // @ts-ignore
  ({ theme, position, severity }) => ({
    width: theme.spacing(0.5),
    height: '100%',
    position: 'absolute',
    left: position === 'left' ? 0 : 'unset',
    right: position === 'right' ? 0 : 'unset',
    backgroundColor: severityBackgroundColor(severity)
  })
);

/**
 * When placed within an AlertItem, this component will render a line at the
 * position side of the AlertItem, indicating the severity of the alert.
 */
const PredictionSeverityLine = (props) => {
  const { severity, position } = props;
  return <StyledSeverityLine severity={severity} position={position} />;
};

const PredictionSeverityLines = (props) => {
  const { severity } = props;

  return (
    <>
      <PredictionSeverityLine severity={severity} position={'left'} />
      <PredictionSeverityLine severity={severity} position={'right'} />
    </>
  );
};

export default PredictionSeverityLines;
