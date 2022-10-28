import { Box, styled } from '@mui/system';
import React, { useEffect, useState } from 'react';

const StyledSeverity = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'index' && prop !== 'severity'
})(
  // @ts-ignore
  ({ theme, index, severity }) => ({
    width: '25px',
    height: '25px',
    marginRight: '2px',
    backgroundColor: index < severity ? theme.palette.error.main : 'grey.300'
  })
);

/**
 * Five stacked horizontal lines to indicate severity
 * For example, if severity is 3, the bottom 3 lines will be red
 * and the top 2 lines will be grey
 *
 */
const VisualSeverity = (props) => {
  const [severity, setSeverity] = useState(props.severity);
  const [severityArray, setSeverityArray] = useState([]);
  useEffect(() => {
    setSeverity(props.severity);
    setSeverityArray(Array.from(Array(5).keys()));
  }, [props.severity]);
  return (
    <Box
      width="fit-content"
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100%'
      }}
      marginRight={3}
      bgcolor={'grey.300'}
      padding={0.4}
    >
      {severityArray.map((_item, index) => {
        return <StyledSeverity key={index} index={index} severity={severity} />;
      })}
    </Box>
  );
};
export default VisualSeverity;
