import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropType from 'prop-types';

import {
  CustomInput,
  CustomSlider,
  CustomButton,
  PageContainer,
  PageIntro,
} from 'Components/common';
import {
  gameSettingActions,
  gameSheetActions,
} from 'Actions';
import {getSettings} from 'Reducers/GameSettingReducer';

/**
 * Gamesettings Component
 * This serves as a wrapper component for several inputs
 * which ultimately set the rules for the game to be played
 */
class GameSettings extends Component {
  /**
   * React Lifecycle - componentDidMount()
   */
  componentDidMount() {
    // TODO@Michel: Remove console.log calls
    /* eslint-disable-next-line */
    console.log(this.props);
  }

  /**
   * Asynchronous Action for starting a new Game
   * Is needed for setting the game-params before loading the
   * GameSheet Component
   *
   * @param {object} gameSettings
   * @return {Promise<void>}
   */
  async startNewGame(gameSettings) {
    await this.props.startGame(gameSettings);
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const inputIds = ['One', 'Two'];
    const {
      gameSettings,
      updatePoints,
      updatePlayer,
      updateRounds,
      navigation,
    } = this.props;
    const {players} = gameSettings;

    return (
      <PageContainer darkMode scrollable>
        <PageIntro
          headerText={'Create new 14/1 game'}
          introText={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ' +
            'sed diam nonumy eirmod tempor invidunt ut labore et dolore ' +
            'magna aliquyam erat, sed diam voluptua. At vero eos et '}
        />
        {inputIds.map((id, index) => {
          const name = players[index] ? players[index].name : '';
          return (
            <CustomInput
              key={index}
              id={'player' + id}
              label={'Player ' + (index + 1)}
              value={name}
              style={{flex: 1}}
              onChangeText={(name) =>
                updatePlayer({
                  index: index,
                  name: name,
                })
              }
              placeholder={'Player ' + id}
              secureTextEntry={false}
            />
          );
        })}
        <CustomSlider
          label={'Maximum Points'}
          value={gameSettings.maxPoints}
          minimumValue={50}
          maximumValue={200}
          onSlidingComplete={(value) => updatePoints(value)}
        />
        <CustomSlider
          label={'Maximum Rounds'}
          value={gameSettings.maxRounds}
          minimumValue={15}
          maximumValue={50}
          onSlidingComplete={(value) => updateRounds(value)}
        />
        <CustomButton
          buttonText={'Start Game'}
          disabled={
            !players[0].name || !players[1].name
          }
          loading={false}
          onPress={() => {
            this.startNewGame(gameSettings)
              .then(function() {
                navigation.navigate('GameSheet');
              });
          }}
        />
      </PageContainer>
    );
  }
}

GameSettings.propTypes = {
  gameSettings: PropType.object,
  updatePlayer: PropType.func,
  updatePoints: PropType.func,
  updateRounds: PropType.func,
  startGame: PropType.func,
  navigation: PropType.object,
};

const mapStateToProps = (state) => {
  return {
    ...getSettings(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updatePlayer: (playerData) =>
    gameSettingActions.updatePlayerAction(dispatch, playerData),
  updatePoints: (maxPoints) =>
    gameSettingActions.updatePointsAction(dispatch, maxPoints),
  updateRounds: (maxRounds) =>
    gameSettingActions.updateRoundsAction(dispatch, maxRounds),
  startGame: (settings) =>
    gameSheetActions.startGameAction(dispatch, settings),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSettings);
