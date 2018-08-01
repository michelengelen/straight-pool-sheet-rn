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
        onPress={props.incrementCurrentScore}
      >
        <Text style={controlTextStyle}>
          <FontAwesome>
            {Icons.minus}
          </FontAwesome>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

ScoreControls.propTypes = {
  incrementCurrentScore: PropType.func.isRequired,
};

const {colors, sizes} = SPS.variables;
const styles = {
  // Styles for the main-component 'ScoreTable'
  ScoreControls: {
    wrapperStyle: {
      flex: 1,
      maxHeight: 50,
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
      backgroundColor: colors.backgroundColors.dimm,
    },
    controlTextStyle: {
      color: colors.textColor,
      fontSize: sizes.font_L,
    },
  },
};

export {ScoreControls};
