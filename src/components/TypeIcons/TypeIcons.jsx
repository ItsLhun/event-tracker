import React from 'react';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PersonIcon from '@mui/icons-material/Person';
import WebhookIcon from '@mui/icons-material/Webhook';
import { Icon } from '@mui/material';

/**
 * Given a type between "human", "mechanical", and "software", return the
 * corresponding icon.
 */
const TypeIcons = (props) => {
  const { type } = props;
  const getElement = () => {
    switch (type) {
      case 'human':
        return <PersonIcon fontSize={'large'} />;
      case 'mechanical':
        return <PrecisionManufacturingIcon fontSize={'large'} />;
      case 'software':
        return <WebhookIcon fontSize={'large'} />;
      default:
        return <Icon fontSize={'large'} />;
    }
  };
  let returnElement = getElement();
  return returnElement;
};
export default TypeIcons;
