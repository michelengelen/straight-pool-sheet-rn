import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropType from 'prop-types';
import {View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';

import {
  CustomButton,
  PageIntro,
} from 'components/common';
import {getSettings} from 'reducers/GameSettingReducer';
import {getGameSheet} from '../reducers/GameSheetReducer';
import SPS from 'common/variables';
import {gameSheetActions, gameSettingActions} from '../actions';

/**
 * Gamesettings Component
 * This serves as a wrapper component for several inputs
 * which ultimately set the rules for the game to be played
 */
class FullscreenModal extends Component {
  /**
   * Constructor function
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.startNewGame = this.startNewGame.bind(this);
    this.finishGame = this.finishGame.bind(this);
  }

  /**
   * accumulates all actions that are needed for starting a new game
   *
   * @param {object}  gameData
   * @param {boolean} restart
   * @param {string}  destination
   */
  startNewGame(gameData, restart = false, destination = 'Home') {
    this.props.finishGame(gameData);
    this.props.clearGame(restart);
    this.props.navigation.navigate(destination);
  }

  /**
   * accumulates all actions that are needed for finishing a new game
   *
   * @param {object}  gameData
   * @param {string}  destination
   */
  finishGame(gameData, destination) {
    this.props.finishGame(gameData);
    this.props.clearGame(false);
    this.props.navigation.navigate(destination);
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {gameSheet} = this.props;

    const {
      wrapperViewStyle,
      modalViewStyle,
      resultView,
      playerView,
      vsView,
      winnerTextStyle,
      looserTextStyle,
      winnerPointStyle,
      looserPointStyle,
      modalBoldTextStyle,
      buttonContainerViewStyle,
    } = styles;

    const {players} = gameSheet;
    const {winner} = gameSheet.gameState;

    return (
      <View style={wrapperViewStyle}>
        <View style={modalViewStyle}>
          <PageIntro
            headerText={'Game over'}
            alignHeadline={'center'}
          />
          <View style={resultView}>
            <View style={{...playerView, alignItems: 'flex-end'}}>
              <Text
                style={winner === 0 ? winnerPointStyle : looserPointStyle}
              >
                {players[0].totalScore}
              </Text>
            </View>
            <View style={vsView}>
              <Text style={{...modalBoldTextStyle, fontSize: sizes.font_XXL}}>-</Text>
            </View>
            <View style={{...playerView, alignItems: 'flex-start'}}>
              <Text
                style={winner === 1 ? winnerPointStyle : looserPointStyle}
              >
                {players[1].totalScore}
              </Text>
            </View>
          </View>
          <View style={resultView}>
            <View style={{...playerView, alignItems: 'flex-end'}}>
              <Text
                style={winner === 0 ? winnerTextStyle : looserTextStyle}
              >
                {players[0].name}
              </Text>
            </View>
            <View style={vsView}>
              <Text style={{...modalBoldTextStyle, fontSize: sizes.font_S}}>vs</Text>
            </View>
            <View style={{...playerView, alignItems: 'flex-start'}}>
              <Text
                style={winner === 1 ? winnerTextStyle : looserTextStyle}
              >
                {players[1].name}
              </Text>
            </View>
          </View>
          <View style={buttonContainerViewStyle}>
            <CustomButton
              buttonText={'New Game'}
              loading={false}
              onPress={() => this.startNewGame(gameSheet, true, 'GameSettings')}
            />
            <CustomButton
              buttonText={'Back to Home'}
              loading={false}
              onPress={() => this.finishGame(gameSheet, 'Home')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const {colors, sizes} = SPS.variables;
const {getDimColor} = SPS;
const styles = {
  wrapperViewStyle: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: getDimColor(colors.grey.darkest, .75),
  },
  modalViewStyle: {
    maxWidth: sizes.dimensions.width * .8,
    margin: sizes.dimensions.width * 0.1,
    backgroundColor: colors.grey.darker,
  },
  resultView: {
    flexDirection: 'row',
  },
  playerView: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  vsView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  winnerTextStyle: {
    fontSize: sizes.font_M,
    fontWeight: 'bold',
    color: colors.text.light,
    padding: 2,
  },
  looserTextStyle: {
    fontSize: sizes.font_M,
    fontWeight: 'bold',
    color: colors.text.mid,
    padding: 2,
  },
  winnerPointStyle: {
    fontSize: sizes.font_XXL,
    color: colors.primary.full,
    padding: 2,
  },
  looserPointStyle: {
    fontSize: sizes.font_XXL,
    color: colors.text.mid,
    padding: 2,
  },
  modalBoldTextStyle: {
    fontWeight: 'bold',
    color: colors.text.light,
    textAlign: 'center',
    padding: 2,
  },
  buttonContainerViewStyle: {
    flexDirection: 'column',
    paddingTop: sizes.gutter / 2,
    paddingBottom: sizes.gutter / 2,
  },
};

FullscreenModal.propTypes = {
  gameSettings: PropType.object,
  gameSheet: PropType.object,
  navigation: PropType.object,
  clearGame: PropType.func,
  swapPlayers: PropType.func,
  finishGame: PropType.func,
};

const mapStateToProps = (state) => {
  return {
    ...getSettings(state),
    ...getGameSheet(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  swapPlayers: (players) =>
    gameSettingActions.swapPlayersAction(dispatch, players),
  clearGame: (restart) =>
    gameSheetActions.clearGameAction(dispatch, restart),
  finishGame: (gameData) =>
    gameSheetActions.finishGameAction(dispatch, gameData),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(FullscreenModal)
);
