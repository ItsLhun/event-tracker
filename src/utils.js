const Chance = require('chance');

let chance = new Chance();

const createNewAlert = () => {
  return {
    key: chance.guid(),
    title: chance.sentence({ words: 5 }),
    severity: chance.integer({ min: 1, max: 5 }),
    type: chance.pickone(['mechanical', 'software', 'human']),
    isPrediction: chance.pickone([true, false]),
    predictionConfidence: chance.integer({ min: 70, max: 99 }),
    description: chance.paragraph({ sentences: 2 }),
    time: new Date()
  };
};

// create a new alert stream
export const createAlertStream = ({ onNewAlert, intervalDuration }) => {
  const interval = setInterval(() => {
    const newItem = createNewAlert();
    if (onNewAlert && typeof onNewAlert === 'function') {
      onNewAlert(newItem);
    }
  }, intervalDuration);
  return () => clearInterval(interval);
};

// Takes a date and returns a string in the format of "HH:MM:SS"
export const formatTime = (date) => {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

// Takes a date and returns a string in the format of "MM/DD/YYYY"
export const formatDate = (date) => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

// Takes a date and returns a string in the format of "MM/DD/YYYY HH:MM:SS"
export const formatDateTime = (date) => {
  return `${formatDate(date)} - ${formatTime(date)}`;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// IBM severity levels
// https://www.color-hex.com/color-palette/33993
export const severityBackgroundColor = (severity) => {
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

export const isArray = (a) => {
  return !!a && a.constructor === Array;
};

export const getPercentageOfConfidence = (confidence) => {
  return `${confidence}%`;
};
