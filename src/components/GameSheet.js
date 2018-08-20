import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropType from 'prop-types';

import {PageContainer} from 'Components/common';
import {gameSheetActions} from 'Actions';
import {PlayerOverview, ScoreControls, ScoreTable} from './gameSheet';
import {getSettings} from 'Reducers/GameSettingReducer';
import {getGameState, undoableFromState} from 'Reducers/GameSheetReducer';
import FullscreenModal from './FullscreenModal';
import {Header} from 'Components/common';

/**
 * Gamesettings Component
 * This serves as a wrapper component for several inputs
 * which ultimately set the rules for the game to be played
 */
class GameSheet extends Component {
  /**
   * React render function
   * @return {*}
   */
  render() {
    const {gameSheet, scoresUndoable} = this.props;
    const {players, rounds} = gameSheet;
    const gameOver = gameSheet.gameState.winner > -1;

    return (
      <PageContainer darkMode scrollable={false}>
        <Header headerText={'ScoreSheet'}/>
        <PlayerOverview players={players} />
        <ScoreTable rounds={rounds} />
        <ScoreControls
          incrementFouls={this.props.incrementFouls}
          incrementScore={this.props.incrementScore}
          completeBook={this.props.completeBook}
          switchPlayer={this.props.switchPlayer}
          undoScore={this.props.undoScore}
          disabled={gameOver}
          undoable={scoresUndoable}
        />
        {gameOver && <FullscreenModal/>}
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
  incrementScore: PropType.func,
  completeBook: PropType.func,
  undoScore: PropType.func,
  scoresUndoable: PropType.bool,
};

const mapStateToProps = (state) => {
  return {
    ...getSettings(state),
    ...getGameState(state),
    ...undoableFromState(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updatePlayerScore: () =>
    gameSheetActions.updatePlayerScoreAction(dispatch),
  incrementFouls: () =>
    gameSheetActions.incrementFoulsAction(dispatch),
  incrementScore: () =>
    gameSheetActions.incrementScoreAction(dispatch),
  completeBook: () =>
    gameSheetActions.completeBookAction(dispatch),
  switchPlayer: () =>
    gameSheetActions.switchPlayerAction(dispatch),
  undoScore: () =>
    gameSheetActions.undoAction(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSheet);
