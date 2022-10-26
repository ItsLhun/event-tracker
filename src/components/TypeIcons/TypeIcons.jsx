import React from 'react';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

/**
 * Given a type between "human", "mechanical", and "software", return the
 * corresponding icon.
 */
const TypeIcons = (props) => {
  const { type } = props;
  const getElement = () => {
    switch (type) {
      case 'human':
        return <PrecisionManufacturingIcon fontSize={'large'} />;
      case 'mechanical':
        return <PrecisionManufacturingIcon fontSize={'large'} />;
      case 'software':
        return <PrecisionManufacturingIcon fontSize={'large'} />;
      default:
        return <PrecisionManufacturingIcon fontSize={'large'} />;
    }
  };
  let returnElement = getElement();
  return returnElement;
};
export default TypeIcons;
