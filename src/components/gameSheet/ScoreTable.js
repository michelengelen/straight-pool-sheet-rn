import React from 'react';
import {StyleSheet, SectionList, View, Text} from 'react-native';
import PropType from 'prop-types';
import SPS from 'Common/variables';

/**
 * Displays a ScoreSet for a player
 *
 * Gets implemented by:
 * - ScoreTableRow
 *
 * @param {object} props
 * @return {*}
 * @constructor
 */
const ScoreTableRowSet = (props) => {
  let {scoreSet = {}} = props;
  const {
    defaultCellViewStyle,
    defaultCellTextStyle,
  } = styles;

  let cellViewStyle = {...defaultCellViewStyle};

  const header = scoreSet === null;
  if (header) {
    cellViewStyle.backgroundColor = colors.backgroundColors.darkGrey;
  }

  let foulCellStyle = {...defaultCellViewStyle};
  if (scoreSet && scoreSet.fouls > 0) {
    foulCellStyle.backgroundColor = colors.backgroundColors.darkRed;
  }

  let parsedScoreSet = {};
  for (const p in scoreSet) {
    if (scoreSet.hasOwnProperty(p)) {
      parsedScoreSet[p] = `${scoreSet[p]}`;
    }
  }

  return (
    <View style={{flex: 6, flexDirection: 'row'}}>
      <View style={{...defaultCellViewStyle, flex: 4}}>
        <Text style={defaultCellTextStyle}>
          {header ? '+' : (parsedScoreSet.currentScore || ' ')}
        </Text>
      </View>
      <View style={foulCellStyle}>
        <Text style={defaultCellTextStyle}>
          {header ? '-' : (parsedScoreSet.fouls || ' ')}
        </Text>
      </View>
      <View style={{...defaultCellViewStyle, flex: 1}}>
        <Text style={defaultCellTextStyle}>
          {header ? 'E' : (parsedScoreSet.totalScore || ' ')}
        </Text>
      </View>
      <View style={{...defaultCellViewStyle, flex: 1}}>
        <Text style={defaultCellTextStyle}>
          {header ? 'R' : (parsedScoreSet.remainingBalls || ' ')}
        </Text>
      </View>
    </View>
  );
};

ScoreTableRowSet.propTypes = {
  scoreSet: PropType.object,
};

/**
 * Renders 2 ScoreSets for the players
 *
 * Gets implemented by:
 * - ScoreTable
 *
 * @param {object} props
 * @return {*}
 * @constructor
 */
const ScoreTableRow = (props) => {
  const {roundScore, roundIndex, header} = props;
  const {
    defaultCellViewStyle,
    defaultCellTextStyle,
  } = styles;

  const score = header ? [null, null] : roundScore;

  const containerStyle = {
    flexDirection: 'row',
    backgroundColor: roundIndex % 2 !== 1
      ? colors.backgroundColors.dimm
      : colors.backgroundColors.grey,
  };

  return (
    <View style={containerStyle}>
      <ScoreTableRowSet scoreSet={score[0]}/>
      <View style={{
        ...defaultCellViewStyle,
        flex: 1,
        backgroundColor: colors.backgroundColors.darkerGrey,
      }}>
        <Text style={defaultCellTextStyle}>
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

const renderItem = (item, index) =>
  <ScoreTableRow
    key={`ScoreTableRow_${index}`}
    roundIndex={index + 1}
    roundScore={item}
  />;

/**
 * Main Component for the rendering of the ScoreTable
 *
 * Components that are needed to render correctly:
 * - ScoreTableRow
 * - ScoreTableRowSet
 *
 * @param {object} props
 * @return {*}
 * @constructor
 */
const ScoreTable = (props) => {
  const {rounds} = props;
  const {wrapperStyle} = styles.ScoreTable;

  const sections = [
    {
      title: 'ScoreTable',
      data: rounds,
    },
  ];

  return (
    <View style={wrapperStyle}>
      <SectionList
        renderItem={({item, index}) => renderItem(item, index)}
        renderSectionHeader={() => <ScoreTableRow header />}
        sections={sections}
        keyExtractor={(item, index) => `ScoreTableRow_${index}`}
        stickySectionHeadersEnabled={true}
      />
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
  defaultCellViewStyle: {
    padding: sizes.gutter / 6,
    alignItems: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.backgroundColors.dimm,
    borderColor: colors.borderColors.dark,
  },
  defaultCellTextStyle: {
    color: colors.textColor,
    fontSize: sizes.font_M,
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export {ScoreTable};
