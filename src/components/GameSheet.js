import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropType from 'prop-types';

// import custom components
import FullscreenModal from './FullscreenModal';
import {PlayerOverview, ScoreControls, ScoreTable} from './gameSheet';
import {SceneContainer} from 'components/common';

// import reducer/actions
import {getSettings} from 'reducers/GameSettingReducer';
import {getGameSheet, undoableFromState} from 'reducers/GameSheetReducer';
import {gameSheetActions} from 'actions';
import {updateRunningGame} from '../common';

/**
 * Gamesettings Component
 * This serves as a wrapper component for several inputs
 * which ultimately set the rules for the game to be played
 */
class GameSheet extends PureComponent {
  /**
   * constructor function
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.scoreTableRef = null;

    this.storeScoreTableRef = this.storeScoreTableRef.bind(this);
  }

  /**
   * React lifecycle method - componentDidUpdate
   */
  componentDidUpdate() {
    const {gameSheet, gameSettings} = this.props;
    const {rounds, gameKey} = gameSheet;

    if (gameSettings.gameRunning && gameSheet.gameKey !== '') {
      updateRunningGame(gameSheet, gameKey).then(() => {
        if (this.scoreTableRef) {
          this.scoreTableRef.scrollToLocation({
            animated: true,
            sectionIndex: 0,
            itemIndex: rounds.length - 1,
            viewPosition: 1,
          });
        }
      });
    }
  }

  /**
   * store the reference to the ScoreTable to this component
   * @param {object} ref
   */
  storeScoreTableRef(ref) {
    this.scoreTableRef = ref;
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {gameSheet, scoresUndoable} = this.props;
    const {players, rounds} = gameSheet;
    const gameOver = gameSheet.gameState.winner > -1;

    return (
      <SceneContainer darkMode scrollable={false} pageTitle={'Scores'}>
        <PlayerOverview players={players} />
        <ScoreTable rounds={rounds} storeRef={(ref) => this.scoreTableRef = ref} />
        <ScoreControls
          incrementFouls={this.props.incrementFouls}
          incrementScore={this.props.incrementScore}
          completeBook={this.props.completeBook}
          switchPlayer={this.props.switchPlayer}
          undoScore={this.props.undoScore}
          disabled={gameOver}
          undoable={scoresUndoable}
        />
        {gameOver && <FullscreenModal />}
      </SceneContainer>
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
    ...getGameSheet(state),
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
