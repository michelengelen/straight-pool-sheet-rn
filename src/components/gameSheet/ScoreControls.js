import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropType from 'prop-types';
import FontAwesome, {Icons} from 'react-native-fontawesome';

import SPS from 'Common/variables';

/**
 * Sub-component rendering a single ScoreControl
 *
 * @param {object} props
 * @return {*}
 * @constructor
 */
const ScoreControl = (props) => {
  const {handleOnPress, controlIcon, disabled} = props;
  const {controlViewStyle, controlTextStyle} = styles.Control;

  return (
    <TouchableOpacity style={controlViewStyle} onPress={handleOnPress} disabled={disabled}>
      <Text style={controlTextStyle}>
        <FontAwesome>{Icons[controlIcon]}</FontAwesome>
      </Text>
    </TouchableOpacity>
  );
};

ScoreControl.propTypes = {
  handleOnPress: PropType.func.isRequired,
  controlIcon: PropType.string.isRequired,
  disabled: PropType.bool,
};

/**
 * Main-component for the rendering of the ScoreControls
 *
 * sub-components:
 * - ScoreControl
 *
 * @param {object} props
 * @return {*}
 * @constructor
 */
const ScoreControls = (props) => {
  const {wrapperStyle} = styles.ScoreControls;
  const {
    incrementScore,
    switchPlayer,
    completeBook,
    incrementFouls,
    undoScore,
    disabled = false,
  } = props;

  return (
    <View style={wrapperStyle}>
      <ScoreControl disabled={disabled} controlIcon={'minusCircle'} handleOnPress={incrementScore} />
      <ScoreControl disabled={disabled} controlIcon={'refresh'} handleOnPress={switchPlayer} />
      <ScoreControl disabled={disabled} controlIcon={'asterisk'} handleOnPress={completeBook} />
      <ScoreControl disabled={disabled} controlIcon={'timesCircle'} handleOnPress={incrementFouls} />
      <ScoreControl disabled={disabled} controlIcon={'arrowLeft'} handleOnPress={undoScore} />
    </View>
  );
};

ScoreControls.propTypes = {
  switchPlayer: PropType.func.isRequired,
  incrementFouls: PropType.func.isRequired,
  incrementScore: PropType.func.isRequired,
  completeBook: PropType.func.isRequired,
  undoScore: PropType.func.isRequired,
  disabled: PropType.bool,
};

const {colors, sizes} = SPS.variables;
const styles = {
  // Styles for the main-component 'ScoreTable'
  ScoreControls: {
    wrapperStyle: {
      flex: 1,
      maxHeight: 60,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: sizes.gutter / 4,
      backgroundColor: colors.backgroundColors.dark,
    },
  },
  Control: {
    controlViewStyle: {
      padding: sizes.gutter / 2,
    },
    controlTextStyle: {
      color: colors.textColor,
      fontSize: sizes.font_XL,
    },
  },
};

export {ScoreControls};
