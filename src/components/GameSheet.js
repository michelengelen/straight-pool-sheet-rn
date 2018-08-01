import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropType from 'prop-types';

import {PageContainer} from 'Components/common';
import {gameSheetActions} from 'Actions';
import {PlayerOverview, ScoreControls, ScoreTable} from './gameSheet';
import {getSettings} from 'Reducers/GameSettingReducer';
import {getGameState} from 'Reducers/GameSheetReducer';

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

    this.handleCurrentScoreIncrement =
      this.handleCurrentScoreIncrement.bind(this);
  }
  /**
   * handle Score increment with ScoreControls component
   */
  handleCurrentScoreIncrement() {
    const {updatePlayerScore, incrementCurrentScore} = this.props;
    incrementCurrentScore();
    updatePlayerScore(
      this.props.gameSheet.rounds[
        this.props.gameSheet.gameState.currentRound - 1
      ][
        this.props.gameSheet.gameState.currentPlayer
      ].totalScore
    );
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
        <PlayerOverview players={players} />
        <ScoreTable rounds={rounds} />
        <ScoreControls
          incrementCurrentScore={this.handleCurrentScoreIncrement}
        />
      </PageContainer>
    );
  }
}

GameSheet.propTypes = {
  gameSettings: PropType.object,
  gameSheet: PropType.object,
  updatePlayerScore: PropType.func,
  incrementCurrentScore: PropType.func,
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
  incrementCurrentScore: () =>
    gameSheetActions.incrementCurrentScoreAction(dispatch, undefined),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSheet);
