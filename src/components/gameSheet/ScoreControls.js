import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropType from 'prop-types';
import FontAwesome, {Icons} from 'react-native-fontawesome';

import SPS from 'Common/variables';

/**
 * Main Component for the rendering of the ScoreTable
 *
 * Components that are needed to render correctly:
 * - ScoreTableRow
 * - ScoreTableRowSet
 *
 * @param {object} props
 * @return {*}
 * @constructor
 */
const ScoreControls = (props) => {
  const {
    wrapperStyle,
  } = styles.ScoreControls;
  const {
    controlViewStyle,
    controlTextStyle,
  } = styles.Control;

  return (
    <View style={wrapperStyle}>
      <TouchableOpacity
        style={controlViewStyle}
        onPress={props.incrementScore}
      >
        <Text style={controlTextStyle}>
          <FontAwesome>
            {Icons.minusCircle}
          </FontAwesome>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={controlViewStyle}
        onPress={props.switchPlayer}
      >
        <Text style={controlTextStyle}>
          <FontAwesome>
            {Icons.refresh}
          </FontAwesome>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={controlViewStyle}
        onPress={props.completeBook}
      >
        <Text style={controlTextStyle}>
          <FontAwesome>
            {Icons.asterisk}
          </FontAwesome>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={controlViewStyle}
        onPress={props.incrementFouls}
      >
        <Text style={controlTextStyle}>
          <FontAwesome>
            {Icons.timesCircle}
          </FontAwesome>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={controlViewStyle}
        onPress={props.undoScore}
      >
        <Text style={controlTextStyle}>
          <FontAwesome>
            {Icons.arrowLeft}
          </FontAwesome>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

ScoreControls.propTypes = {
  switchPlayer: PropType.func.isRequired,
  incrementFouls: PropType.func.isRequired,
  incrementScore: PropType.func.isRequired,
  completeBook: PropType.func.isRequired,
  undoScore: PropType.func.isRequired,
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
