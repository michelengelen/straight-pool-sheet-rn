import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import PropType from 'prop-types';

import {CustomInput, CustomSlider, Header} from 'Components/common';
import * as actions from 'Actions';
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
   * React Lifecycle - componentDiDUpdate()
   */
  componentDidUpdate() {
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
    const {gameSettings} = this.props;

    return (
      <View style={{flex: 1}}>
        <Header headerText={'New Game'} />
        {inputIds.map((id, index) => {
          return (
            <CustomInput
              key={index}
              id={'player' + id}
              label={'Input name for player ' + (index + 1)}
              value={gameSettings.players['player' + id].name}
              style={{flex: 1}}
              onChangeText={(name) =>
                this.props.updatePlayer({
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
          onSlidingComplete={(value) => this.props.updatePoints(value)}
        />
        <CustomSlider
          label={'Maximum Rounds'}
          value={gameSettings.maxRounds}
          minimumValue={15}
          maximumValue={50}
          onSlidingComplete={(value) => this.props.updateRounds(value)}
        />
      </View>
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
    actions.updatePlayerAction(dispatch, playerData),
  updatePoints: (maxPoints) =>
    actions.updatePointsAction(dispatch, maxPoints),
  updateRounds: (maxRounds) =>
    actions.updateRoundsAction(dispatch, maxRounds),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSettings);
