import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import PropType from 'prop-types';

import SPS from 'common/variables';
import Images from 'assets/images';

/**
 * Sub-component rendering a single ScoreControl
 *
 * @param {object} props
 * @return {*}
 * @constructor
 */
const ScoreControl = (props) => {
  const {handleOnPress, controlIcon, disabled} = props;
  const {controlViewStyle} = styles.Control;
  const {Icons} = Images;

  return (
    <TouchableOpacity style={controlViewStyle} onPress={handleOnPress} disabled={disabled}>
      <Image
        source={{uri: Icons[controlIcon]}}
        style={{width: undefined, height: undefined, flex: 1, aspectRatio: 1}}
      />
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
      <ScoreControl disabled={disabled} controlIcon={'minus'} handleOnPress={incrementScore} />
      <ScoreControl disabled={disabled} controlIcon={'book'} handleOnPress={completeBook} />
      <ScoreControl disabled={disabled} controlIcon={'foul'} handleOnPress={incrementFouls} />
      <ScoreControl disabled={disabled} controlIcon={'player'} handleOnPress={switchPlayer} />
      <ScoreControl disabled={disabled} controlIcon={'undo'} handleOnPress={undoScore} />
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
      backgroundColor: colors.grey.dark,
    },
  },
  Control: {
    controlViewStyle: {
    },
    controlTextStyle: {
      color: colors.text.light,
      fontSize: sizes.font_XL,
    },
  },
};

export {ScoreControls};
