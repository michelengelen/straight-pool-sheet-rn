import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropType from 'prop-types';
import SPS from 'Common/variables';

/**
 * Renders the calculated score for a player
 *
 * Gets implemented by:
 * - SinglePlayer
 *
 * @param {object} props
 * @return {*}
 * @constructor
 */
const ScoreTableRowSet = (props) => {
  const {scoreSet = {}} = props;
  const {defaultCellStyle} = styles;
  const header = scoreSet === null;

  return (
    <View style={{flex: 5, flexDirection: 'row'}}>
      <View style={{...defaultCellStyle, flex: 3}}>
        <Text style={{color: 'white', fontSize: 10}}>
          {header ? '+' : (scoreSet.score === 0 ? '0' : '')}
        </Text>
      </View>
      <View style={{...defaultCellStyle, flex: 1}}>
        <Text style={{color: 'white', fontSize: 10}}>
          {header ? '-' : (scoreSet.fouls === 0 ? '0' : '')}
        </Text>
      </View>
      <View style={{...defaultCellStyle, flex: 1}}>
        <Text style={{color: 'white', fontSize: 10}}>
          {header ? 'E' : (scoreSet.totalScore === 0 ? '0' : '')}
        </Text>
      </View>
      <View style={{...defaultCellStyle, flex: 1}}>
        <Text style={{color: 'white', fontSize: 10}}>
          {header ? 'R' : (scoreSet.remainingBalls || '')}
        </Text>
      </View>
    </View>
  );
};

ScoreTableRowSet.propTypes = {
  scoreSet: PropType.object,
};

/**
 * Renders the calculated score for a player
 *
 * Gets implemented by:
 * - SinglePlayer
 *
 * @param {object} props
 * @return {*}
 * @constructor
 */
const ScoreTableRow = (props) => {
  const {roundScore, roundIndex, header} = props;
  const {defaultCellStyle} = styles;

  const score = header ? [null, null] : roundScore;

  const containerStyle = {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: roundIndex % 2 !== 1
      ? colors.backgroundColors.dimm
      : colors.backgroundColors.grey,
  };

  return (
    <View style={containerStyle}>
      <ScoreTableRowSet scoreSet={score[0]}/>
      <View style={{...defaultCellStyle, flex: 2}}>
        <Text style={{color: 'white', fontSize: 10}}>
          {header ? '#' : roundIndex}
        </Text>
      </View>
      <ScoreTableRowSet scoreSet={score[1]}/>
    </View>
  );
};

ScoreTableRow.propTypes = {
  header: PropType.bool,
  roundIndex: PropType.number,
  roundScore: PropType.array,
};

/**
 * Main Component for the rendering of the overView above the GameSheet-Table
 *
 * Components that are needed to render correctly:
 * - SinglePlayer
 * - CalculatedScore (implemented by SinglePlayer component)
 *
 * @param {object} props
 * @return {*}
 * @constructor
 */
const ScoreTable = (props) => {
  const {rounds} = props;
  const {wrapperStyle} = styles.ScoreTable;

  return (
    <View style={wrapperStyle}>
      <ScoreTableRow header />
      {rounds.map(
        (round, index) =>
          <ScoreTableRow
            key={`ScoreTableRow_${index}`}
            roundIndex={index + 1}
            roundScore={round}
          />
      )}
    </View>
  );
};

ScoreTable.propTypes = {
  rounds: PropType.array,
};

const {colors, sizes} = SPS.variables;
const styles = {
  // Styles for the main-component 'ScoreTable'
  ScoreTable: {
    wrapperStyle: {
      flex: 1,
      alignItems: 'stretch',
      paddingBottom: sizes.gutter / 2,
      paddingTop: sizes.gutter / 2,
      backgroundColor: colors.backgroundColors.darkGrey,
    },
  },
  // Styles for the sub-component 'ScoreTableHeader'
  ScoreTableHeader: {
  },
  // Styles for the sub-component 'ScoreTableRow'
  ScoreTableRow: {
  },
  // Styles every cell in the table have in common
  defaultCellStyle: {
    padding: sizes.gutter / 6,
    alignItems: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.backgroundColors.dimm,
    borderColor: colors.borderColors.dark,
  },
};

export {ScoreTable};
