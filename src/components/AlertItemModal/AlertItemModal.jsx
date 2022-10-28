import { Modal, Typography, Button, IconButton } from '@mui/material';
import { Box, styled } from '@mui/system';
import TypeIcons from 'components/TypeIcons/TypeIcons';
import VisualSeverity from 'components/VisualSeverity/VisualSeverity';
import React from 'react';
import { formatDateTime, getPercentageOfConfidence } from 'utils';
import CloseIcon from '@mui/icons-material/Close';

const StyledDiscardButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.dark
  }
}));

const StyledCompleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.success.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.success.dark
  }
}));

const StyledSubtitleTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500
}));

const StyledModalBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: theme.breakpoints.values.md,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1)
}));

/**
 * MUI modal component for Alert Item, it will be centered on the screen
 */
const AlertItemModal = (props) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
    >
      <StyledModalBox>
        {/* Close button on top right corner */}
        <IconButton
          size="large"
          color="inherit"
          aria-label="close"
          onClick={props.handleClose}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: 1
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" component="h2">
          {props.alertData.title}
        </Typography>
        {props.alertData.isPrediction && (
          <Box display="flex" flexDirection="row" gap={1} alignItems="center">
            <StyledSubtitleTypography variant="h6">
              This event is a prediction with{' '}
              {getPercentageOfConfidence(props.alertData.predictionConfidence)}{' '}
              confidence.
            </StyledSubtitleTypography>
          </Box>
        )}

        <Box display="flex" flexDirection="row" gap={1} alignItems="center">
          <StyledSubtitleTypography variant="h6">
            Type:
          </StyledSubtitleTypography>
          <Typography variant="body1" component="p">
            {props.alertData.type}
          </Typography>
          <TypeIcons type={props.alertData.type} />
        </Box>
        <Box display="flex" flexDirection="row" gap={1} alignItems="center">
          <StyledSubtitleTypography variant="h6">
            Time:
          </StyledSubtitleTypography>
          <Typography variant="body1">
            {formatDateTime(props.alertData.time)}
          </Typography>
        </Box>
        <StyledSubtitleTypography variant="h6">
          Description:
        </StyledSubtitleTypography>
        <Typography
          variant="body1"
          component="p"
          textAlign="justify"
          fontSize={'1.2rem'}
        >
          {props.alertData.description}
        </Typography>

        <Box display="flex" flexDirection="row" gap={1} alignItems="center">
          <StyledSubtitleTypography variant="h6">
            Severity:
          </StyledSubtitleTypography>
          <VisualSeverity severity={props.alertData.severity} />
        </Box>
        {/* Action buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: '1rem'
          }}
        >
          <StyledDiscardButton
            variant="contained"
            onClick={() => {
              props.handleDiscardOrCompleteItem(props.alertData, 'Discard');
              props.handleClose();
            }}
          >
            Discard
          </StyledDiscardButton>
          <StyledCompleteButton
            variant="contained"
            onClick={() => {
              props.handleDiscardOrCompleteItem(props.alertData, 'Complete');
              props.handleClose();
            }}
          >
            Complete
          </StyledCompleteButton>
        </Box>
      </StyledModalBox>
    </Modal>
  );
};

export default AlertItemModal;
