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

export {
  updateObjectsInArray,
  updateObjectInArray,
  updateNestedArray,
  insertItem,
  removeItem,
  buildCurrentScoreText,
};
