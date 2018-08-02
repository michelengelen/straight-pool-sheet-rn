import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropType from 'prop-types';

import {PageContainer} from 'Components/common';
import {gameSheetActions} from 'Actions';
import {PlayerOverview, ScoreControls, ScoreTable} from './gameSheet';
import {getSettings} from 'Reducers/GameSettingReducer';
import {getGameState} from 'Reducers/GameSheetReducer';
import FullscreenModal from './FullscreenModal';

/**
 * Gamesettings Component
 * This serves as a wrapper component for several inputs
 * which ultimately set the rules for the game to be played
 */
class GameSheet extends Component {
  /**
   * Constructor function for the class-component
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.handleCurrentScoreIncrement = this.handleCurrentScoreIncrement.bind(
      this
    );
    this.handleFoulIncrement = this.handleFoulIncrement.bind(
      this
    );
    this.handlePlayerSwitch = this.handlePlayerSwitch.bind(
      this
    );
  }

  /**
   * handle Score increment with ScoreControls component
   */
  handleCurrentScoreIncrement() {
    const {updatePlayerScore, incrementCurrentScore} = this.props;
    incrementCurrentScore();
    updatePlayerScore();
  }

  /**
   * handle Score increment with ScoreControls component
   */
  handleFoulIncrement() {
    const {updatePlayerScore, incrementFouls} = this.props;
    incrementFouls();
    updatePlayerScore();
  }

  /**
   * handle switching the player with ScoreControls component
   */
  handlePlayerSwitch() {
    const {updatePlayerScore, switchPlayer} = this.props;
    switchPlayer();
    updatePlayerScore();
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {gameSheet} = this.props;
    const {players, rounds} = gameSheet;
    return (
      <PageContainer darkMode scrollable={false}>
        {gameSheet.gameState.winner > -1 && <FullscreenModal/>}
        <PlayerOverview players={players} />
        <ScoreTable rounds={rounds} />
        <ScoreControls
          incrementFouls={this.handleFoulIncrement}
          incrementCurrentScore={this.handleCurrentScoreIncrement}
          switchPlayer={this.handlePlayerSwitch}
        />
      </PageContainer>
    );
  }
}

GameSheet.propTypes = {
  gameSettings: PropType.object,
  gameSheet: PropType.object,
  switchPlayer: PropType.func,
  updatePlayerScore: PropType.func,
  incrementFouls: PropType.func,
  incrementCurrentScore: PropType.func,
};

const mapStateToProps = (state) => {
  return {
    ...getSettings(state),
    ...getGameState(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updatePlayerScore: () =>
    gameSheetActions.updatePlayerScoreAction(dispatch, undefined),
  incrementFouls: () =>
    gameSheetActions.incrementFoulsAction(dispatch, undefined),
  incrementCurrentScore: () =>
    gameSheetActions.incrementCurrentScoreAction(dispatch, undefined),
  switchPlayer: () =>
    gameSheetActions.switchPlayerAction(dispatch, undefined),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSheet);
