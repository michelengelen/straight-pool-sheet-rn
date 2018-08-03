/**
 * Helper Function to update Objects in an array.
 * Useful for reducers to maintain immutability of the state
 *
 * @param {array} array   Array to be mapped over
 * @param {array} action  Array with Objects to update
 * @return {*}
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

// GameSheetReducer specific
const buildCurrentScoreText = (score, breaks) => {
  if (breaks.length < 1) return `${score}`;

  let currentScore = '';
  for (let i = 0; i < breaks.length; i++) {
    currentScore += breaks[i] + ' / ';
  }
  return currentScore + score;
};

export {updateObjectsInArray, buildCurrentScoreText};
