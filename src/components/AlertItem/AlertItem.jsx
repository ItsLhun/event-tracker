import { Icon, ListItem, styled, Typography, useTheme } from '@mui/material';
import React from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import TypeIcons from 'components/TypeIcons/TypeIcons';
import { useItems } from 'contexts/ItemsContext';
import AlertItemModal from 'components/AlertItemModal/AlertItemModal';
import Reasonbox from 'components/ReasonBox/Reasonbox';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import { Box } from '@mui/system';
import PredictionSeverityLines from 'components/PredictionSeverityLine/PredictionSeverityLines';
import { severityBackgroundColor } from 'utils';

const StyliedListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'alertData'
})(
  // @ts-ignore
  ({ theme, alertData }) => ({
    backgroundColor: alertData.isPrediction
      ? 'white'
      : severityBackgroundColor(alertData.severity),
    color: alertData.isPrediction
      ? 'black'
      : theme.palette.getContrastText(
          severityBackgroundColor(alertData.severity)
        ),
    padding: theme.spacing(2.5),
    paddingLeft: theme.spacing(2),
    border: '1px solid lightgray',
    lineHeight: '1.5em',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  })
);

const Notification = (props) => {
  const { handleDiscardOrCompleteItem } = useItems();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  return (
    <>
      <StyliedListItem
        alertData={props.alertData}
        theme={theme}
        onClick={handleOpen}
      >
        <PredictionSeverityLines severity={props.alertData.severity} />

        {/* Icons start */}
        <Box display="flex" flexDirection="row" gap={theme.spacing(1)} mr={2}>
          <TypeIcons type={props.alertData.type} />
          {(props.alertData.severity > 3 && !props.alertData.isPrediction && (
            <ReportProblemIcon fontSize="large" />
          )) || <Icon fontSize={'large'} />}
        </Box>
        <Typography variant="h5" component="h2">
          {props.alertData.title}
        </Typography>
        {/* Icons end */}
        <Box
          alignSelf={'flex-end'}
          marginLeft={'auto'}
          display="flex"
          flexDirection="row"
          gap={theme.spacing(1)}
        >
          {props.alertData.isPrediction && (
            <BatchPredictionIcon fontSize="large" />
          )}
          {props.alertData.reason && (
            <Reasonbox reason={props.alertData.reason} />
          )}
        </Box>
      </StyliedListItem>
      <AlertItemModal
        open={open}
        alertData={props.alertData}
        handleClose={handleClose}
        handleDiscardOrCompleteItem={handleDiscardOrCompleteItem}
      />
    </>
  );
};

export default Notification;
