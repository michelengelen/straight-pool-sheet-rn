import React from 'react';
import {View, Text} from 'react-native';
import PropType from 'prop-types';
import SPS from 'Common/variables';

const SinglePlayer = (props) => {
  const {
    name,
    currentScore,
    highestScore,
    averageScore,
  } = props.player;
  const {
    containerStyle,
    subContainerStyle,
    nameStyle,
    currentScoreViewStyle,
    averageScoreViewStyle,
    highestScoreViewStyle,
    currentScoreStyle,
    averageScoreStyle,
    highestScoreStyle,
  } = styles;

  const mergedContainerStyle = {...containerStyle, ...props.style};

  return (
    <View style={mergedContainerStyle}>
      <View style={currentScoreViewStyle}>
        <Text style={nameStyle}>{name}</Text>
        <Text style={currentScoreStyle}>{currentScore}</Text>
      </View>
      <View style={subContainerStyle}>
        <View style={averageScoreViewStyle}>
          <Text style={averageScoreStyle}>{`AVG = ${averageScore}`}</Text>
        </View>
        <View style={highestScoreViewStyle}>
          <Text style={highestScoreStyle}>{`Max = ${highestScore}`}</Text>
        </View>
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

const PlayerOverview = (props) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'stretch',
      borderBottomWidth: 1,
      borderColor: colors.textColorDim,
    }}>
      <SinglePlayer
        player={props.players.playerOne}
        style={{borderRightWidth: 1, borderColor: colors.textColorDim}}
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
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
  },
  subContainerStyle: {
    flex: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderColor: colors.textColorDim,
  },
  nameStyle: {
    fontSize: sizes.font_L,
    fontWeight: 'bold',
    padding: sizes.gutter / 2,
    color: colors.textColor,
  },
  currentScoreViewStyle: {
    flex: 1,
    minHeight: 80,
    alignItems: 'center',
  },
  averageScoreViewStyle: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: colors.textColorDim,
    alignItems: 'center',
  },
  highestScoreViewStyle: {
    flex: 1,
    alignItems: 'center',
  },
  currentScoreStyle: {
    fontSize: sizes.font_XXL,
    fontWeight: 'bold',
    color: colors.textColor,
  },
  averageScoreStyle: {
    fontSize: sizes.font_L,
    fontWeight: 'bold',
    color: colors.textColorDim,
  },
  highestScoreStyle: {
    fontSize: sizes.font_L,
    fontWeight: 'bold',
    color: colors.textColorDim,
  },
};

export {PlayerOverview};
