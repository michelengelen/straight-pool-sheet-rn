import React from 'react';
import {View, Text} from 'react-native';
import PropType from 'prop-types';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import SPS from 'Common/variables';

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
        <Text style={calculatedScoreTextStyle}>
          <FontAwesome>
            {Icons[iconType]}
          </FontAwesome>
        </Text>
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
  calculatedScore: PropType.number.isRequired,
  iconType: PropType.string.isRequired,
};

const SinglePlayer = (props) => {
  const {
    name,
    currentScore,
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
        <Text style={currentScoreTextStyle}>{currentScore}</Text>
      </View>
      <View style={subContainerStyle}>
        <CalculatedScore calculatedScore={averageScore} iconType={'ban'}/>
        <CalculatedScore calculatedScore={highestScore} iconType={'lineChart'}/>
      </View>
    </View>
  );
};

SinglePlayer.propTypes = {
  player: PropType.shape({
    name: PropType.string,
    currentScore: PropType.number,
    highestScore: PropType.number,
    averageScore: PropType.number,
  }),
  style: PropType.object,
};

/**
 * Main Component for the rendering of the overView above the GameSheet-Table
 *
 * Components that are needed to render correctly:
 * - SinglePlayer
 * - CalculatedScore (inside SinglePlayer)
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
        player={props.players.playerOne}
        style={firstPlayerStyle}
      />
      <SinglePlayer
        player={props.players.playerTwo}
      />
    </View>
  );
};

PlayerOverview.propTypes = {
  players: PropType.object,
};

const {colors, sizes} = SPS.variables;
const styles = {
  // Styles for the main-component 'PlayerOverview'
  PlayerOverview: {
    wrapperStyle: {
      flexDirection: 'row',
      alignItems: 'stretch',
      borderBottomWidth: 1,
      borderColor: colors.borderColors.darker,
      backgroundColor: colors.backgroundColors.dark,
      shadowColor: '#000',
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
      flex: 1,
      alignItems: 'center',
    },
    currentScoreTextStyle: {
      fontSize: sizes.font_XXL,
      fontWeight: 'bold',
      color: colors.textColorDim,
      padding: sizes.gutter / 2,
    },
    playernameViewStyle: {
      flex: 1,
      alignItems: 'center',
      padding: sizes.gutter / 4,
      backgroundColor: colors.backgroundColors.darker,
      borderBottomWidth: 1,
      borderColor: colors.borderColors.darker,
    },
    playernameTextStyle: {
      fontSize: sizes.font_L,
      fontWeight: 'bold',
      color: colors.textColorDim,
    },
    subContainerStyle: {
      flex: 1,
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
      color: colors.textColorDim,
    },
    iconViewStyle: {
      flex: 1,
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: sizes.gutter / 4,
      backgroundColor: colors.backgroundColors.darker,
    },
  },
};

export {PlayerOverview};