import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import PropType from 'prop-types';

import {CustomInput} from 'Components/common';
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

    return (
      <View style={{flex: 1}}>
        {inputIds.map((id, index) => {
          return (
            <CustomInput
              key={index}
              id={'player' + id}
              label={'Input name for player ' + (index + 1)}
              value={this.props.gameSettings.players['player' + id].name}
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
      </View>
    );
  }
}

GameSettings.propTypes = {
  gameSettings: PropType.object,
  updatePlayer: PropType.func,
};

const mapStateToProps = (state) => {
  return {
    ...getSettings(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updatePlayer: (playerData) =>
    actions.updatePlayerAction(dispatch, playerData),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSettings);
