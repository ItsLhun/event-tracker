import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
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
      sx={{
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        height: '100%'
      }}
      marginRight={3}
      bgcolor={'grey.300'}
      padding={0.4}
    >
      {severityArray.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              width: '25px',
              height: '5px',
              marginBottom: '2px',
              backgroundColor:
                index < severity ? 'red' : 'rgba(255, 255, 255, 0.5)'
            }}
          />
        );
      })}
    </Box>
  );
};
export default VisualSeverity;
