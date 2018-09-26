import React, {Component} from 'react';
import PropType from 'prop-types';
import {ART, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {SceneContainer} from 'components/common';
import {Fade} from 'components/common';
import {LoadingIndicator} from 'components/common/LoadingIndicator';
import {getAuth} from 'reducers/AuthReducer';
import {auth, database} from 'assets';
import {getTimeString, getTimePlayed} from 'helpers';
import {i18n} from 'assets';

import LineChart from './LineChart';

import SPS from 'common/variables';
const {colors, sizes} = SPS.variables;

// destructure ART components
const {Path, Surface, Shape} = ART;

/**
 * Statistics component
 * renders all information regarding the currently logged in user
 */
class Statistics extends Component {
  /**
   * react constructor call
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      gameData: [],
    };

    const uid = auth.currentUser.uid;
    database
      .ref('users/' + uid + '/playedGames')
      .once('value')
      .then((snap) => {
        const gameKeys = snap.val();
        Promise.all(
          gameKeys.filter((x) => x).map((gameKey) => {
            if (!gameKey) return;
            const reference = `games/${gameKey}`;
            return database
              .ref(reference)
              .once('value')
              .then((snap) => snap.val());
          })
        ).then((data) => {
          this.setState({
            stats: Statistics.calculateStats(data),
            loading: false,
            gameData: data,
          });
        });
      });
  }

  /**
   * calculate all time- and inning-related things
   * @param   {object[]}  gameData
   * @return  {object}
   */
  static calculateStats(gameData) {
    const timeStats = {
      // returns INT
      allGamesPlayed: gameData.length,
      // returns INT
      allInningsPlayed: 0,
      // returns INT (in ms played for calculation)
      averageLengthPerGame: 0,
      // returns INT (in ms played for calculation)
      averageLengthPerInning: 0,
      // returns INT (in ms played for calculation)
      allTimesPlayed: 0,
      // returns percentage of time played in games
      averageTimePerGame: 0,
      // returns float with 2 digits after separator (x.xx)
      averageInningsPerGame: 0,
      // returns {number[]}
      inningsPlayedInGame: [],
      // returns {number[]}
      timePlayedInGame: [],
    };

    const pointStats = {
      // returns INT
      gamesPlayed: gameData.length,
      // returns INT
      gamesWon: 0,
      // returns INT
      gamesLost: 0,
      // returns INT
      highestRun: 0,
      // returns INT
      totalFouls: 0,
      // returns float with 2 digits after separator (x.xx)
      averageHighestRun: 0,
      // returns float with 2 digits after separator (x.xx)
      averagePointsPerGame: 0,
      // returns float with 2 digits after separator (x.xx)
      averagePointsPerInning: 0,
      // returns float with 2 digits after separator (x.xx)
      averageFoulsPerGame: 0,
    };

    const charts = {
      averagePointsPerInning: {
        max: 0,
        points: [],
      },
    };

    // sum of every game length together
    let allGameLengths = 0;
    let allPoints = 0;
    let allHighRuns = 0;

    for (let i = 0; i < gameData.length; i++) {
      // only count games that were finished and not cancelled
      if (gameData[i].gameState.cancelled) continue;
      const {rounds, players, gameState} = gameData[i];

      if (gameState.startTime && gameState.finishTime) {
        allGameLengths += getTimePlayed(gameState.startTime, gameState.finishTime, false);
      }

      const playerIndex = players[0].useAccount ? 0 : 1;
      if (gameState.winner !== -1 && gameState.winner === playerIndex) pointStats.gamesWon++;
      if (gameState.winner !== -1 && gameState.winner !== playerIndex) pointStats.gamesLost++;

      if (players[playerIndex].highestScore > pointStats.highestRun) {
        pointStats.highestRun = players[playerIndex].highestScore;
      }

      allPoints += players[playerIndex].totalScore;
      allHighRuns += players[playerIndex].highestScore;

      // store the innings that you played in each game to an array
      timeStats.inningsPlayedInGame[i] = rounds[rounds.length - 1][playerIndex] ? rounds.length : rounds.length - 1;
      timeStats.timePlayedInGame[i] = 0;

      for (let j = 0; j < rounds.length; j++) {
        // when playerIndex is 1 and player 0 ended the game in this round player 1 does not have playtime to calculate
        if (!rounds[j][playerIndex]) continue;

        // initiate start/-endTime for calculations
        let startTime = 0;
        let endTime = 0;

        // when playerIndex is 0, this means the second players always has the second inning-set
        if (playerIndex === 0) {
          startTime = rounds[j][0].startTime;
          endTime = rounds[j][1] ? rounds[j][1].startTime : gameState.finishTime;
        } else {
          startTime = rounds[j][1].startTime;
          endTime = rounds[j + 1] ? rounds[j + 1][0].startTime : gameState.finishTime;
        }

        pointStats.totalFouls += rounds[j][playerIndex].fouls;
        timeStats.timePlayedInGame[i] += getTimePlayed(startTime, endTime, false);
      }

      timeStats.allInningsPlayed += timeStats.inningsPlayedInGame[i];
      timeStats.allTimesPlayed += timeStats.timePlayedInGame[i];
      const averagePointsPerInning =
        parseFloat((players[playerIndex].totalScore / timeStats.inningsPlayedInGame[i]).toFixed(2));
      if (averagePointsPerInning > charts.averagePointsPerInning.max) {
        charts.averagePointsPerInning.max = averagePointsPerInning;
      }
      charts.averagePointsPerInning.points.push(averagePointsPerInning);
    }

    // store timeStats
    timeStats.averageLengthPerGame = Math.ceil(allGameLengths / timeStats.allGamesPlayed);
    timeStats.averageTimePerGame = Math.ceil(timeStats.allTimesPlayed / timeStats.allGamesPlayed);
    timeStats.averageInningsPerGame = (timeStats.allTimesPlayed / timeStats.allGamesPlayed).toFixed(2);
    timeStats.averageLengthPerInning = Math.ceil(timeStats.allTimesPlayed / timeStats.allInningsPlayed);

    // store pointStats
    pointStats.averagePointsPerGame = (allPoints / timeStats.allGamesPlayed).toFixed(2);
    pointStats.averagePointsPerInning = (allPoints / timeStats.allInningsPlayed).toFixed(2);
    pointStats.averageHighestRun = (allHighRuns / timeStats.allGamesPlayed).toFixed(2);
    pointStats.averageFoulsPerGame = (pointStats.totalFouls / timeStats.allGamesPlayed).toFixed(2);

    return {
      timeStats,
      pointStats,
      charts,
    };
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {loading, gameData, stats} = this.state;
    const {
      chartWrapper,
      headlineContainer,
      headlineText,
      statsWrapper,
      statsRow,
      statsContainer,
      statsLabel,
      statsText,
    } = styles;

    if (stats) {
      const {timeStats, pointStats} = stats;

      console.log('### gameData: ', gameData);
      console.log('### all stats: ', stats);

      // number of games played
      console.log('### number of games played: ', timeStats.allGamesPlayed);

      // average time played per game
      console.log('### average time played per game: ', getTimeString(timeStats.averageLengthPerGame));

      // number of innings played
      console.log('### number of innings played: ', timeStats.allInningsPlayed);

      // average time played per inning
      console.log('### average time played per inning: ', getTimeString(timeStats.averageLengthPerInning));

      // average time played per game
      console.log('### average time played per game: ', getTimeString(timeStats.averageTimePerGame));

      // total time played
      console.log('### total time played: ', getTimeString(timeStats.allTimesPlayed));

      // High Run: highest run
      console.log('### highest run: ', pointStats.highestRun);

      // average  High runs per game:
      console.log('### average highest run: ', pointStats.averageHighestRun);

      // points per inning
      console.log('### average points per inning: ', pointStats.averagePointsPerInning);
    }

    // points per minute
    // fouls
    // fouls per game

    /* probably good stats, but hard to calc */
    // average points in 1st, 2nd, 3rd and 4th quarter of the game

    return (
      <SceneContainer darkMode scrollable={false}>
        <View
          style={{
            flex: 1,
            paddingTop: sizes.gutter * 0.5,
            alignitems: 'stretch',
          }}
        >
          <Fade
            visible={loading}
            style={{
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <LoadingIndicator size={'medium'} />
          </Fade>

          {stats &&
            <View style={statsWrapper}>

              <LineChart width={sizes.dimensions.width} data={stats.charts.averagePointsPerInning}/>

              <View style={headlineContainer}>
                <Text style={headlineText}>Game-/Inning-Stats</Text>
              </View>

              <View style={statsRow}>
                <View style={statsContainer}>
                  <Text style={statsLabel}>
                    {i18n.t('stats.allGamesPlayed.label')}
                  </Text>
                  <Text style={statsText}>
                    {`${stats.timeStats.allGamesPlayed} ${i18n.t('stats.allGamesPlayed.unit')}`}
                  </Text>
                </View>
                <View style={statsContainer}>
                  <Text style={statsLabel}>
                    {i18n.t('stats.allInningsPlayed.label')}
                  </Text>
                  <Text style={statsText}>
                    {`${stats.timeStats.allInningsPlayed} ${i18n.t('stats.allInningsPlayed.unit')}`}
                  </Text>
                </View>
              </View>

              <View style={statsRow}>
                <View style={statsContainer}>
                  <Text style={statsLabel}>
                    {i18n.t('stats.gamesWon.label')}
                  </Text>
                  <Text style={statsText}>
                    {`${stats.pointStats.gamesWon} ${i18n.t('stats.gamesWon.unit')}`}
                  </Text>
                </View>
                <View style={statsContainer}>
                  <Text style={statsLabel}>
                    {i18n.t('stats.gamesLost.label')}
                  </Text>
                  <Text style={statsText}>
                    {`${stats.pointStats.gamesLost} ${i18n.t('stats.gamesLost.unit')}`}
                  </Text>
                </View>
              </View>

              <View style={statsRow}>
                <View style={statsContainer}>
                  <Text style={statsLabel}>
                    {i18n.t('stats.averageLengthPerGame.label')}
                  </Text>
                  <Text style={statsText}>
                    {`${getTimeString(stats.timeStats.averageLengthPerGame)}`}
                  </Text>
                </View>
                <View style={statsContainer}>
                  <Text style={statsLabel}>
                    {i18n.t('stats.averageLengthPerInning.label')}
                  </Text>
                  <Text style={statsText}>
                    {`${getTimeString(stats.timeStats.averageLengthPerInning)}`}
                  </Text>
                </View>
              </View>

              <View style={headlineContainer}>
                <Text style={headlineText}>Point-Stats</Text>
              </View>

              <View style={statsRow}>
                <View style={statsContainer}>
                  <Text style={statsLabel}>
                    {i18n.t('stats.averagePointsPerGame.label')}
                  </Text>
                  <Text style={statsText}>
                    {`${stats.pointStats.averagePointsPerGame} ${i18n.t('stats.averagePointsPerGame.unit')}`}
                  </Text>
                </View>
                <View style={statsContainer}>
                  <Text style={statsLabel}>
                    {i18n.t('stats.averagePointsPerInning.label')}
                  </Text>
                  <Text style={statsText}>
                    {`${stats.pointStats.averagePointsPerInning} ${i18n.t('stats.averagePointsPerInning.unit')}`}
                  </Text>
                </View>
              </View>

              <View style={statsRow}>
                <View style={statsContainer}>
                  <Text style={statsLabel}>
                    {i18n.t('stats.highestRun.label')}
                  </Text>
                  <Text style={statsText}>
                    {`${stats.pointStats.highestRun} ${i18n.t('stats.highestRun.unit')}`}
                  </Text>
                </View>
                <View style={statsContainer}>
                  <Text style={statsLabel}>
                    {i18n.t('stats.averageHighestRun.label')}
                  </Text>
                  <Text style={statsText}>
                    {`${stats.pointStats.averageHighestRun} ${i18n.t('stats.averageHighestRun.unit')}`}
                  </Text>
                </View>
              </View>

              <View style={statsRow}>
                <View style={statsContainer}>
                  <Text style={statsLabel}>
                    {i18n.t('stats.totalFouls.label')}
                  </Text>
                  <Text style={statsText}>
                    {`${stats.pointStats.totalFouls} ${i18n.t('stats.totalFouls.unit')}`}
                  </Text>
                </View>
                <View style={statsContainer}>
                  <Text style={statsLabel}>
                    {i18n.t('stats.averageFoulsPerGame.label')}
                  </Text>
                  <Text style={statsText}>
                    {`${stats.pointStats.averageFoulsPerGame} ${i18n.t('stats.averageFoulsPerGame.unit')}`}
                  </Text>
                </View>
              </View>

            </View>
          }
        </View>
      </SceneContainer>
    );
  }
}

Statistics.propTypes = {
  authState: PropType.shape({
    isLoggedIn: PropType.bool.isRequired,
    user: PropType.object.isRequired,
  }),
  navigation: PropType.object,
};

const styles = StyleSheet.create({
  chartWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.text.dark,
    width: sizes.dimensions.width,
  },
  statsWrapper: {
    flex: 1,
    paddingVertical: sizes.gutter * .5,
    alignItems: 'stretch',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: sizes.gutter,
  },
  statsContainer: {
    flex: 1,
    paddingVertical: sizes.gutter * .75,
  },
  statsLabel: {
    fontSize: sizes.font_S,
    color: colors.text.mid,
  },
  statsText: {
    fontSize: sizes.font_M,
    fontWeight: 'bold',
    color: colors.text.light,
  },
  headlineContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.text.mid,
    paddingVertical: sizes.gutter * .5,
    paddingHorizontal: sizes.gutter,
  },
  headlineText: {
    fontSize: sizes.font_L,
    fontWeight: 'bold',
    color: colors.text.light,
  },
});

const mapStateToProps = (state) => {
  return {
    ...getAuth(state),
  };
};

export default withNavigation(connect(mapStateToProps, null)(Statistics));
