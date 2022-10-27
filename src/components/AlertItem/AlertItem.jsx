import {
  Box,
  Button,
  Fade,
  Icon,
  ListItem,
  Modal,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import VisualSeverity from 'components/VisualSeverity/VisualSeverity';
import React from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import TypeIcons from 'components/TypeIcons/TypeIcons';
import { useItems } from 'contexts/ItemsContext';

// IBM severity levels
// https://www.color-hex.com/color-palette/33993
const severityBackgroundColor = (severity) => {
  switch (severity) {
    case 1:
      return '#00ac46';
    case 2:
      return '#fdc500';
    case 3:
      return '#fd8c00';
    case 4:
      return '#dc0000';
    case 5:
      return '#780000';
    default:
      return '#780000';
  }
};

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
    // alertData.severity === 5 || alertData.severity === 4 ? 'white' : 'black',
    padding: theme.spacing(2.5),
    paddingLeft: theme.spacing(2),
    border: '1px solid lightgray',
    lineHeight: '1.5em'
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
        // @ts-ignore
        alertData={props.alertData}
        theme={theme}
        onClick={handleOpen}
      >
        <TypeIcons type={props.alertData.type} />
        {(props.alertData.severity > 3 && !props.alertData.isPrediction && (
          <ReportProblemIcon fontSize="large" />
        )) || <Icon />}
        {props.alertData.severity}
        <Typography variant="h5" component="h2">
          {props.alertData.title}
        </Typography>
      </StyliedListItem>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          <Box bgcolor="white" sx={{ p: 2, margin: 'auto', width: '50%' }}>
            <VisualSeverity severity={props.alertData.severity} />
            <Typography variant="h5" component="h2">
              Title: {props.alertData.title}
            </Typography>
            <Typography variant="body1" component="p">
              Description: {props.alertData.description}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleDiscardOrCompleteItem(props.alertData, 'Discard');
                handleClose();
              }}
            >
              Discard
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Notification;
