import React, {Component} from 'react';
import PropType from 'prop-types';
import {ART, StyleSheet, View} from 'react-native';

// import {i18n} from 'assets';

import SPS from 'common/variables';
const {colors, sizes} = SPS.variables;

// destructure ART components
const {Path, Surface, Shape} = ART;

/**
 * LineChart component
 * renders all information regarding the currently logged in user
 */
class LineChart extends Component {
  /**
   * react constructor call
   * @param {object} props
   */
  constructor(props) {
    super(props);
  }

  createPath(width, height, data) {
    const xmax = data.points.length - 1;
    const ymax = ((data.max * 1.1) - ((data.max * 1.1) % 5 ) + 5);

    const p = data.points.map((point, index) => (
      {
        x: (index / xmax) * width,
        y: height - ((point / ymax) * height),
      }
    ));

    let i = 1;
    // eslint-disable-next-line
    let path = Path().moveTo(0, p[0].y);

    for (i; i < p.length; i++) {
      path = path.lineTo(p[i].x, p[i].y);
    }

    return path;
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {data, width} = this.props;
    const height = width * .5;
    const {chartWrapper} = styles;

    const path = this.createPath(width, height, data);

    // points per minute
    // fouls
    // fouls per game

    /* probably good stats, but hard to calc */
    // average points in 1st, 2nd, 3rd and 4th quarter of the game

    return (
      <View style={chartWrapper}>
        <Surface width={width} height={height}>
          <Shape strokeWidth={2} stroke={colors.primary.full} d={path} />
        </Surface>
      </View>
    );
  }
}

LineChart.propTypes = {
  width: PropType.number.isRequired,
  data: PropType.object.isRequired,
};

const styles = StyleSheet.create({
  chartWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.text.dark,
    width: sizes.dimensions.width,
  },
});

export default LineChart;
