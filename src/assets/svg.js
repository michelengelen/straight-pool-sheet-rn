import Svg, {Circle, Line, Polygon, Polyline} from 'react-native-svg';

import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import PropType from 'prop-types';
import SPS from 'common/variables';
const {colors} = SPS.variables;

// Used to center the Svg inside the View
const WRAPPER_STYLE = [StyleSheet.absoluteFill, {alignItems: 'center', justifyContent: 'center'}];

// standard width/height for Icons
const ICON_WIDTH = 30;
const ICON_HEIGHT = 30;

/**
 * AverageIcon - used for statistics
 */
class AverageIcon extends PureComponent {
  /**
   * react render function
   * @return {jsx}
   */
  render() {
    const {svgWidth, svgHeight} = this.props;
    const height = svgHeight || ICON_HEIGHT;
    const width = svgWidth || ICON_WIDTH;

    return (
      <View style={WRAPPER_STYLE}>
        <Svg height={height} width={width} viewBox="0 0 50 50">
          <Circle cx={25} cy={25} r={15} fill={'none'} stroke={colors.grey.svgIcon} strokeWidth={2} />
          <Line x1={9.8} y1={40.2} x2={40.2} y2={9.8} fill={'none'} stroke={colors.primary.full} strokeWidth={4} />
        </Svg>
      </View>
    );
  }
}

AverageIcon.propTypes = {
  svgWidth: PropType.number.isRequired,
  svgHeight: PropType.number.isRequired,
};

/**
 * AverageIcon - used for statistics
 */
class MaximumIcon extends PureComponent {
  /**
   * react render function
   * @return {jsx}
   */
  render() {
    const {svgWidth, svgHeight} = this.props;
    const height = svgHeight || ICON_HEIGHT;
    const width = svgWidth || ICON_WIDTH;

    return (
      <View style={WRAPPER_STYLE}>
        <Svg height={height} width={width} viewBox="0 0 50 50">
          <Polygon
            fill={colors.primary.full}
            points={'27.67 11.5 27.67 15.5 32.34 15.5 25.67 22.17 21.67 18.17 11 28.84 11 34.5 21.67 23.83 25.67' +
            ' 27.83 42 11.5 27.67 11.5'}
          />
          <Polyline
            fill={'none'} stroke={colors.grey.svgIcon} strokeWidth={2}
            points={'42 38.5 10 38.5 10 11.5'}
          />
        </Svg>
      </View>
    );
  }
}

MaximumIcon.propTypes = {
  svgWidth: PropType.number.isRequired,
  svgHeight: PropType.number.isRequired,
};

export {AverageIcon, MaximumIcon};
