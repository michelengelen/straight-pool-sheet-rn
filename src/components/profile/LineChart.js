import React, {Component} from 'react';
import PropType from 'prop-types';
import {ART, StyleSheet, View} from 'react-native';
import Morph from 'art/morph/path';

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

    const initialData = {
      max: props.data.max,
      points: [0, 0, 0, 0],
    };

    this.state = {
      graphWidth: props.width,
      graphHeight: props.width * .5,
      linePath: null,
    };

    this.previousGraph = this.createPath(initialData);
    this.state.linePath = this.previousGraph;

    this.animate = this.animate.bind(this);
    this.createPath = this.createPath.bind(this);
  }

  componentDidMount() {
    this.computeNextState(this.props, true);
  }

  componentDidUpdate() {
    this.computeNextState(this.props);
  }

  computeNextState(nextProps, initial = false) {
    if (initial || this.props !== nextProps) {
      const pathFrom = this.previousGraph;
      const pathTo = this.createPath(this.props.data);

      cancelAnimationFrame(this.animating);
      this.animating = null;

      this.setState({
        // Create the ART Morph.Tween instance.
        linePath: Morph.Tween( // eslint-disable-line new-cap
          pathFrom,
          pathTo,
        ),
      }, () => {
        // Kick off our animations!
        this.animate();
      });

      this.previousGraph = pathTo;
    }
  }

  // This is where we animate our graph's path value.
  animate(start) {
    this.animating = requestAnimationFrame((timestamp) => {
      if (!start) {
        // eslint-disable-next-line no-param-reassign
        start = timestamp;
      }

      // Get the delta on how far long in our animation we are.
      const delta = (timestamp - start) / 750;

      // If we're above 1 then our animation should be complete.
      if (delta >= 1) {
        this.animating = null;
        // Just to be safe set our final value to the new graph path.

        // Stop our animation loop.
        return;
      }

      // Tween the SVG path value according to what delta we're currently at.
      this.state.linePath.tween(delta);

      // Update our state with the new tween value and then jump back into
      // this loop.
      this.setState(this.state, () => {
        this.animate(start);
      });
    });
  }

  createPath(data) {
    const {graphWidth, graphHeight} = this.state;

    const xmax = data.points.length - 1;
    const ymax = ((data.max * 1.1) - ((data.max * 1.1) % 5 ) + 5);

    const p = data.points.map((point, index) => (
      {
        x: (index / xmax) * graphWidth,
        y: graphHeight - ((point / ymax) * graphHeight),
      }
    ));

    let i = 1;
    // eslint-disable-next-line
    let path = Morph.Path()
      .move(-2, graphHeight + 2)
      .lineTo(-2, p[0].y);

    for (i; i < p.length - 2; i++) {
      const xc = (p[i].x + p[i + 1].x) / 2;
      const yc = (p[i].y + p[i + 1].y) / 2;
      path = path.curveTo(p[i].x, p[i].y, xc, yc);
    }

    path = path
      .curveTo(p[i].x, p[i].y, p[i + 1].x, p[i + 1].y)
      .lineTo(graphWidth + 2, p[i + 1].y)
      .lineTo(graphWidth + 2, graphHeight + 2)
      .close();

    return path;
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {graphWidth, graphHeight, linePath} = this.state;
    const {chartWrapper} = styles;

    return (
      <View style={chartWrapper}>
        <Surface width={graphWidth} height={graphHeight}>
          <Shape
            strokeWidth={2}
            stroke={colors.primary.full}
            fill={'rgba(110, 206, 219, .25)'}
            d={linePath}
          />
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
    overflow: 'hidden',
  },
});

export default LineChart;
