import {i18n} from 'assets';

/**
 * Helper Function to update objects inside an array.
 *
 * @param {array} array   Array to be mapped over
 * @param {array} action  Array with Objects to update
 * @return {array}
 */
const updateObjectsInArray = (array, action) => {
  return array.map((item, index) => {
    let i = 0;
    let returnItem = item;
    for (i; i <= action.length; i++) {
      let itemIndex = action[i].index || i;
      if (index === itemIndex) {
        returnItem = {
          ...item,
          ...action[itemIndex],
        };
        break;
      }
    }
    return returnItem;
  });
};

/**
 * Helper Function to update an object inside an array.
 *
 * @param {array} array     Array to be mapped over
 * @param {object} action   Object to update
 * @return {array}
 */
const updateObjectInArray = (array, action) => {
  return array.map((item, index) => {
    if (index !== action.index) {
      return item;
    }

    return {
      ...item,
      ...action.item,
    };
  });
};

/**
 * Helper Function to update an array inside an array.
 *
 * @param {array} array     Array to be mapped over
 * @param {object} action   Object to update
 * @return {array}
 */
const updateNestedArray = (array, action) => {
  return array.map((item, index) => {
    if (index !== action.index) {
      return item;
    }

    return [
      ...action.item,
    ];
  });
};

/**
 * Helper Function to insert an item in an array.
 *
 * @param {array} array     Array to be mapped over
 * @param {object} action   Object to update
 *                          (action.item will be inserted at index action.index)
 * @return {array}
 */
const insertItem = (array, action) => {
  let newArray = array.slice();
  newArray.splice(action.index, 0, action.item);
  return newArray;
};

/**
 * Helper Function to remove an item from an array.
 *
 * @param {array} array     Array to be mapped over
 * @param {object} action   Object to update
 *                          (action.item will be removed at index action.index)
 * @return {array}
 */
const removeItem = (array, action) => {
  let newArray = array.slice();
  newArray.splice(action.index, 1);
  return newArray;
};

// GameSheetReducer specific
const buildCurrentScoreText = (score, breaks) => {
  if (breaks.length < 1) return `${score}`;

  let currentScore = '';
  for (let i = 0; i < breaks.length; i++) {
    currentScore += breaks[i] + '/';
  }
  return currentScore + score;
};

/**
 * parse a timestring and return a full timeString (DD/MM/YYYY, HH:MM)
 * @param   {string} timeString
 * @return  {string}
 */
const getFullDate = (timeString) => {
  const d = new Date(timeString);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const hours = d.getHours();
  let minutes = `${d.getMinutes()}`;

  if (minutes.length < 2) minutes = `0${minutes}`;

  if (i18n.locale.includes('de')) {
    return `${day}. ${month}. ${year}, ${hours}:${minutes}`;
  }

  return `${month}/${day}/${year}, ${hours}:${minutes}`;
};

/**
 * parse start- and endTime to calculate the time played
 * @param   {string}  startTime
 * @param   {string}  endTime
 * @param   {boolean} [getString]
 * @return  {string | number}
 */
const getTimePlayed = (startTime, endTime, getString = true) => {
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();

  if (!getString) return (end - start);

  return getTimeString(end - start);
};

/**
 * get a string representing the time passed into the function (in ms)
 * @param   {number} time  time in millseconds
 * @return  {string} returns string in format hh/mm/ss
 */
const getTimeString = (time) => {
  const t = new Date(time);

  const hours = t.getUTCHours();
  const minutes = t.getUTCMinutes();
  const seconds = t.getUTCSeconds();

  let m = minutes.toString();
  let s = seconds.toString();

  if (m.length < 2) m = `0${minutes}`;
  if (s.length < 2) s = `0${seconds}`;

  if (hours > 0) {
    return `${hours}h ${m}m ${s}s`;
  } else if (hours === 0 && minutes > 0) {
    return `${m}m ${s}s`;
  }

  return `${s}s`;
};

export {
  updateObjectsInArray,
  updateObjectInArray,
  updateNestedArray,
  insertItem,
  removeItem,
  buildCurrentScoreText,
  getFullDate,
  getTimePlayed,
  getTimeString,
};
