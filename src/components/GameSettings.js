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
import {gameSettingActions} from 'Actions';
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
    } = this.props;
    const {playerOne, playerTwo} = gameSettings.players;

    return (
      <PageContainer darkMode scrollable>
        <PageIntro
          headerText={'Create new 14/1 game'}
          introText={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ' +
            'sed diam nonumy eirmod tempor invidunt ut labore et dolore ' +
            'magna aliquyam erat, sed diam voluptua. At vero eos et ' +
            'accusam et justo duo dolores et ea rebum. Stet clita kasd ' +
            'gubergren, no sea takimata sanctus est ' +
            'Lorem ipsum dolor sit amet.'}
        />
        {inputIds.map((id, index) => {
          return (
            <CustomInput
              key={index}
              id={'player' + id}
              label={'Player ' + (index + 1)}
              value={gameSettings.players['player' + id].name}
              style={{flex: 1}}
              onChangeText={(name) =>
                updatePlayer({
                  key: 'player' + id,
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
            !playerOne.name || !playerTwo.name
          }
          loading={false}
          onPress={() => {
            return false;
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
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSettings);
