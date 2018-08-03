import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropType from 'prop-types';
import {View, Text} from 'react-native';
import { withNavigation } from 'react-navigation';

import {
  CustomButton,
  PageIntro,
} from 'Components/common';
import {getSettings} from 'Reducers/GameSettingReducer';
import {getGameState} from '../reducers/GameSheetReducer';
import SPS from 'Common/variables';
import {gameSheetActions} from '../actions';

/**
 * Gamesettings Component
 * This serves as a wrapper component for several inputs
 * which ultimately set the rules for the game to be played
 */
class FullscreenModal extends Component {
  constructor(props) {
    super(props);

    this.startNewGame = this.startNewGame.bind(this);
  }

  startNewGame(restart = false, destination = 'Home') {
    this.props.clearGame(restart);
    this.props.navigation.navigate(destination);
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {
      gameSettings,
      gameSheet,
    } = this.props;

    const {
      wrapperViewStyle,
      modalViewStyle,
      modalTextStyle,
      modalBoldTextStyle,
      buttonContainerViewStyle,
    } = styles;

    const {players} = gameSettings;
    const {winner} = gameSheet.gameState;

    return (
      <View style={wrapperViewStyle}>
        <View style={modalViewStyle}>
          <PageIntro
            headerText={'Game over'}
            alignHeadline={'center'}
          />
          <Text style={modalTextStyle}>
            {'The winner of this game is '}
            <Text style={modalBoldTextStyle}>
              {players[winner].name}
            </Text>
            {' with a score of '}
            <Text style={modalBoldTextStyle}>
              {players[winner].totalScore}
            </Text>
          </Text>
          <View style={buttonContainerViewStyle}>
            <CustomButton
              buttonText={'New Game'}
              loading={false}
              onPress={() => this.startNewGame(true, 'GameSettings')}
            />
            <CustomButton
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
    backgroundColor: colors.backgroundColors.darkerGrey,
  },
  modalViewStyle: {
    maxWidth: sizes.dimensions.width * .8,
    margin: sizes.dimensions.width * 0.1,
    padding: sizes.gutter,
    backgroundColor: colors.backgroundColors.dark,
  },
  modalTextStyle: {
    fontSize: sizes.font_L,
    color: colors.textColorDim,
  },
  modalBoldTextStyle: {
    fontWeight: 'bold',
    color: colors.textColor,
  },
  buttonContainerViewStyle: {
    flexDirection: 'column',
    paddingTop: sizes.gutter / 2,
  },
};

FullscreenModal.propTypes = {
  gameSettings: PropType.object,
  gameSheet: PropType.object,
  navigation: PropType.object,
  clearGame: PropType.func,
};

const mapStateToProps = (state) => {
  return {
    ...getSettings(state),
    ...getGameState(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearGame: (restart) =>
    gameSheetActions.clearGameAction(dispatch, restart),
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(FullscreenModal));
