import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropType from 'prop-types';
import {View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';

import {
  CustomButton,
  PageIntro,
} from 'Components/common';
import {getSettings} from 'Reducers/GameSettingReducer';
import {getGameState} from '../reducers/GameSheetReducer';
import SPS from 'Common/variables';
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
  }

  /**
   * accumulates all actions that are needed for starting a new game
   *
   * @param {boolean} restart
   * @param {string}  destination
   */
  startNewGame(restart = false, destination = 'Home') {
    this.props.preFillPlayers(this.props.gameSheet.players);
    this.props.clearGame(restart);
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

    if (winner === 0) {
      winnerTextStyle.textAlign = winnerPointStyle.textAlign = 'right';
      looserTextStyle.textAlign = looserPointStyle.textAlign = 'left';
    } else {
      winnerTextStyle.textAlign = winnerPointStyle.textAlign = 'left';
      looserTextStyle.textAlign = looserPointStyle.textAlign = 'right';
    }

    return (
      <View style={wrapperViewStyle}>
        <View style={modalViewStyle}>
          <PageIntro
            headerText={'Game over'}
            alignHeadline={'center'}
          />
          <View style={resultView}>
            <View style={playerView}>
              <Text
                style={winner === 0 ? winnerPointStyle : looserPointStyle}
              >
                {players[0].totalScore}
              </Text>
            </View>
            <View style={vsView}>
              <Text style={{...modalBoldTextStyle, fontSize: sizes.font_XXL}}>:</Text>
            </View>
            <View style={playerView}>
              <Text
                style={winner === 1 ? winnerPointStyle : looserPointStyle}
              >
                {players[1].totalScore}
              </Text>
            </View>
          </View>
          <View style={resultView}>
            <View style={playerView}>
              <Text
                style={winner === 0 ? winnerTextStyle : looserTextStyle}
              >
                {players[0].name}
              </Text>
            </View>
            <View style={vsView}>
              <Text style={{...modalBoldTextStyle, fontSize: sizes.font_S}}>VS</Text>
            </View>
            <View style={playerView}>
              <Text
                style={winner === 1 ? winnerTextStyle : looserTextStyle}
              >
                {players[1].name}
              </Text>
            </View>
          </View>
          <View style={buttonContainerViewStyle}>
            <CustomButton
              style={{flex: 1}}
              buttonText={'New Game'}
              loading={false}
              onPress={() => this.startNewGame(true, 'GameSettings')}
            />
            <CustomButton
              style={{flex: 1}}
              buttonText={'Back to Home'}
              loading={false}
              onPress={this.startNewGame}
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
    padding: sizes.gutter,
    backgroundColor: colors.grey.dark,
  },
  resultView: {
    flexDirection: 'row',
  },
  playerView: {
    flex: 3,
    justifyContent: 'space-around',
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
    color: colors.text.mid,
    padding: 2,
  },
  winnerPointStyle: {
    fontSize: sizes.font_XXL,
    fontWeight: 'bold',
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
    paddingTop: sizes.gutter,
  },
};

FullscreenModal.propTypes = {
  gameSettings: PropType.object,
  gameSheet: PropType.object,
  navigation: PropType.object,
  clearGame: PropType.func,
  preFillPlayers: PropType.func,
};

const mapStateToProps = (state) => {
  return {
    ...getSettings(state),
    ...getGameState(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  preFillPlayers: (players) =>
    gameSettingActions.preFillPlayersAction(dispatch, players),
  clearGame: (restart) =>
    gameSheetActions.clearGameAction(dispatch, restart),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(FullscreenModal)
);
