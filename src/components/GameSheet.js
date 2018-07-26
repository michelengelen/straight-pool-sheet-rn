import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropType from 'prop-types';

import {
  PageContainer,
} from 'Components/common';
import {gameSheetActions} from 'Actions';
import {getSettings} from 'Reducers/GameSettingReducer';
import {getGameState} from 'Reducers/GameSheetReducer';

/**
 * Gamesettings Component
 * This serves as a wrapper component for several inputs
 * which ultimately set the rules for the game to be played
 */
class GameSheet extends Component {
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
    return (
      <PageContainer darkMode scrollable>
      </PageContainer>
    );
  }
}

GameSheet.propTypes = {
  gameSettings: PropType.object,
};

const mapStateToProps = (state) => {
  return {
    ...getSettings(state),
    ...getGameState(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updatePlayerScore: (playerData) =>
    gameSheetActions.updatePlayerScoreAction(dispatch, playerData),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSheet);
