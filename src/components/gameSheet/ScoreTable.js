import React, {PureComponent} from 'react';
import {SectionList, Text, View} from 'react-native';
import PropType from 'prop-types';
import SPS from 'Common/variables';

/**
 * calculate the offset for each item in the SectionList component
 *
 * @param   {number[]}  rowHeights
 * @param   {number}    index
 * @return  {{itemLength: number, itemOffset: number}}
 */
const calculateOffset = (rowHeights, index) => {
  let itemOffset = 0;
  for (let i = index; i >= 0; i--) {
    itemOffset += rowHeights[i];
  }

  if (isNaN(itemOffset)) {
    // if offset could not be calculated return default (header) sizes
    return {
      itemLength: rowHeights[0],
      itemOffset: rowHeights[0] * index,
    };
  }

  return {
    itemLength: rowHeights[index],
    itemOffset,
  };
};

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

  const header = scoreSet === null;

  let foulCellStyle = {...defaultCellViewStyle};
  if (scoreSet && scoreSet.fouls > 0) {
    foulCellStyle.backgroundColor = colors.useCase.foul;
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
      ? colors.grey.dark
      : colors.grey.darker,
  };

  if (header) {
    containerStyle.backgroundColor = colors.grey.darkest;
  }

  return (
    <View style={containerStyle} onLayout={props.onLayout}>
      <ScoreTableRowSet scoreSet={score[0]}/>
      <View style={{
        ...defaultCellViewStyle,
        flex: 1,
        backgroundColor: colors.grey.darkest,
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

const renderItem = (item, index, callback) =>
  <ScoreTableRow
    key={`ScoreTableRow_${index}`}
    roundIndex={index + 1}
    roundScore={item}
    onLayout={callback}
    header={item.length === 0}
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
class ScoreTable extends PureComponent {
  constructor(props) {
    super(props);

    this.rowHeights = [];

    this.getRowHeight = this.getRowHeight.bind(this);
    this.getItemLayout = this.getItemLayout.bind(this);
  }

  /**
   * gets passed down to each ScoreTabelRow to gather the heights
   * that get used in the getItemLayout callback of SectionList component
   *
   * @param {object} x
   */
  getRowHeight(x) {
    this.rowHeights.push(x.nativeEvent.layout.height);
  }

  /**
   * callback function for the SectionList component to get offset
   * and height of each ScoreTableRow
   *
   * @param {object[]} data
   * @param {number} index
   * @return {{length: number, offset: number, index: number}}
   */
  getItemLayout(data, index) {
    const itemData = calculateOffset(this.rowHeights, index);

    return {
      length: itemData.itemLength,
      offset: itemData.itemOffset,
      index,
    };
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {rounds} = this.props;
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
          renderItem={({item, index}) => renderItem(item, index, (x) => this.getRowHeight(x))}
          renderSectionHeader={() => renderItem([], 0, (x) => this.getRowHeight(x))}
          getItemLayout={this.getItemLayout}
          ref={(ref) => this.props.storeRef(ref)}
          sections={sections}
          keyExtractor={(item, index) => `ScoreTableRow_${index}`}
          stickySectionHeadersEnabled={true}
        />
      </View>
    );
  }
}

ScoreTable.propTypes = {
  rounds: PropType.array,
  storeRef: PropType.func,
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
      backgroundColor: colors.grey.darker,
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
    padding: sizes.gutter / 5,
    alignItems: 'center',
  },
  defaultCellTextStyle: {
    color: colors.text.light,
    fontSize: sizes.font_M,
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export {ScoreTable};
