import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';

import {CustomInput} from './common';
import * as actions from '../actions';

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
    // TODO@Michel: Remove console.log calls
    /* eslint-disable-next-line */
    console.log(this.props);

    return (
      <View style={{flex: 1}}>
        {inputIds.map((id, index) => {
          return (
            <CustomInput
              key={index}
              id={'player' + id}
              label={'Input name for player ' + (index + 1)}
              value={this.props.players['player' + id].name}
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

const mapStateToProps = (state) => {
  // TODO@Michel: Remove console.log calls
  /* eslint-disable-next-line */
  console.log(state);
  return {
    players: state.gameSettings.players,
  };
};

export default connect(mapStateToProps, actions)(GameSettings);
