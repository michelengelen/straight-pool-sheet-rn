import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import PropType from 'prop-types';

import {
  CustomInput,
  CustomSlider,
  CustomButton,
  Header,
  PageContainer,
} from 'Components/common';
import {
  gameSettingActions,
  gameSheetActions,
} from 'Actions';
import {getSettings} from 'Reducers/GameSettingReducer';

import SPS from 'Common/variables';
const {sizes} = SPS.variables;

/**
 * Gamesettings Component
 * This serves as a wrapper component for several inputs
 * which ultimately set the rules for the game to be played
 */
class GameSettings extends Component {
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
      <View style={{flex: 1}}>
        <Header headerText={'New Game'}/>
        <PageContainer darkMode scrollable>
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
            style={{marginTop: sizes.gutter / 2}}
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
      </View>
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
