import React from 'react';
import {View, Text} from 'react-native';
import PropType from 'prop-types';
import SPS from 'common/variables';
import Image from 'react-native-remote-svg';

import Images from 'assets/images';

/**
 * Renders the calculated score for a player
 *
 * Gets implemented by:
 * - SinglePlayer
 *
 * @param {object} props
 * @return {*}
 * @constructor
 */
const CalculatedScore = (props) => {
  const {iconType, calculatedScore} = props;
  const {
    calculatedScoreWrapper,
    calculatedScoreViewStyle,
    calculatedScoreTextStyle,
    iconViewStyle,
  } = styles.CalculatedScore;

  return (
    <View style={calculatedScoreWrapper}>
      <View style={iconViewStyle}>
        <Image source={Images.Icons[iconType]} style={{maxWidth: '100%'}}/>
      </View>
      <View style={calculatedScoreViewStyle}>
        <Text style={calculatedScoreTextStyle}>
          {calculatedScore}
        </Text>
      </View>
    </View>
  );
};

CalculatedScore.propTypes = {
  calculatedScore: PropType.oneOfType([
    PropType.number,
    PropType.string,
  ]).isRequired,
  iconType: PropType.string.isRequired,
};

/**
 * SinglePlayer component (renders one players score)
 *
 * Components that are needed to render correctly:
 * - CalculatedScore
 *
 * Gets implemented by:
 * - PlayerOverview
 *
 * @param {object} props
 * @return {*}
 * @constructor
 */
const SinglePlayer = (props) => {
  const {
    name,
    totalScore,
    highestScore,
    averageScore,
  } = props.player;
  const {
    containerStyle,
    currentScoreViewStyle,
    currentScoreTextStyle,
    playernameViewStyle,
    playernameTextStyle,
    subContainerStyle,
  } = styles.SinglePlayer;

  const mergedContainerStyle = {...containerStyle, ...props.style};

  return (
    <View style={mergedContainerStyle}>
      <View style={playernameViewStyle}>
        <Text style={playernameTextStyle}>{name}</Text>
      </View>
      <View style={currentScoreViewStyle}>
        <Text style={currentScoreTextStyle}>{totalScore}</Text>
      </View>
      <View style={subContainerStyle}>
        <CalculatedScore calculatedScore={averageScore} iconType={'average'}/>
        <CalculatedScore calculatedScore={highestScore} iconType={'maximum'}/>
      </View>
    </View>
  );
};

SinglePlayer.propTypes = {
  player: PropType.shape({
    name: PropType.string,
    totalScore: PropType.oneOfType([
      PropType.number,
      PropType.string,
    ]),
    highestScore: PropType.oneOfType([
      PropType.number,
      PropType.string,
    ]),
    averageScore: PropType.oneOfType([
      PropType.number,
      PropType.string,
    ]),
  }),
  style: PropType.object,
};

/**
 * Main Component for the rendering of the overView above the GameSheet-Table
 *
 * Components that are needed to render correctly:
 * - SinglePlayer
 * - CalculatedScore (implemented by SinglePlayer component)
 *
 * @param {object} props
 * @return {*}
 * @constructor
 */
const PlayerOverview = (props) => {
  const {wrapperStyle, firstPlayerStyle} = styles.PlayerOverview;

  return (
    <View style={wrapperStyle}>
      <SinglePlayer
        player={props.players[0]}
        style={firstPlayerStyle}
      />
      <SinglePlayer
        player={props.players[1]}
      />
    </View>
  );
};

PlayerOverview.propTypes = {
  players: PropType.arrayOf(PropType.object),
};

const {colors, sizes} = SPS.variables;
const styles = {
  // Styles for the main-component 'PlayerOverview'
  PlayerOverview: {
    wrapperStyle: {
      flex: 1,
      maxHeight: 120,
      flexDirection: 'row',
      alignItems: 'stretch',
      borderBottomWidth: 1,
      borderColor: colors.borderColors.darker,
      backgroundColor: colors.grey.dark,
      shadowColor: colors.shadow,
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.3,
      elevation: 2,
    },
    firstPlayerStyle: {
      borderRightWidth: 1,
      borderColor: colors.borderColors.darker,
    },
  },
  // Styles for the sub-component 'SinglePlayer'
  SinglePlayer: {
    containerStyle: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
    currentScoreViewStyle: {
      flex: 4,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    currentScoreTextStyle: {
      fontSize: sizes.font_XXL,
      fontWeight: 'bold',
      color: colors.text.light,
      padding: sizes.gutter / 2,
    },
    playernameViewStyle: {
      flex: 1,
      alignItems: 'center',
      padding: sizes.gutter / 4,
      backgroundColor: colors.grey.darker,
      borderBottomWidth: 1,
      borderColor: colors.borderColors.darker,
    },
    playernameTextStyle: {
      fontSize: sizes.font_L,
      fontWeight: 'bold',
      color: colors.text.mid,
    },
    subContainerStyle: {
      flex: 2,
      borderTopWidth: 1,
      flexDirection: 'row',
      alignItems: 'stretch',
      borderColor: colors.borderColors.darker,
    },
  },
  // Styles for the sub-component 'CalculatedScore'
  CalculatedScore: {
    calculatedScoreWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: colors.borderColors.darker,
    },
    calculatedScoreViewStyle: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    calculatedScoreTextStyle: {
      fontSize: sizes.font_L,
      fontWeight: 'bold',
      color: colors.text.light,
    },
    iconViewStyle: {
      flex: 1,
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: sizes.gutter / 4,
      backgroundColor: colors.grey.dark,
    },
  },
};

export {PlayerOverview};
