import React, {PureComponent} from 'react';
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

  componentDidUpdate() {
    const {rounds} = this.props.gameSheet;

    if (this.scoreTableRef && rounds[rounds.length - 1].length === 1) {
      console.log('#### test ####');
      this.scoreTableRef.scrollToLocation({
        animated: true,
        sectionIndex: 0,
        itemIndex: rounds.length,
        viewPosition: 1,
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
      <PageContainer darkMode scrollable={false}>
        <Header headerText={'ScoreSheet'}/>
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
