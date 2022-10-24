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
      onNewAlert((items) => {
        if (items.length < 20) {
          return [...items, newItem];
        } else {
          return [newItem];
        }
      });
    }
  }, intervalDuration);
  return () => clearInterval(interval);
};

// Takes a date and returns a string in the format of "HH:MM:SS"
export const formatTime = (date) => {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
