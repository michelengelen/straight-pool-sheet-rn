import React, {Component} from 'react';
import PropType from 'prop-types';
import {ART, StyleSheet, Text, View} from 'react-native';
import Morph from 'art/morph/path';

// import {i18n} from 'assets';

import SPS from 'common/variables';
const {colors, sizes} = SPS.variables;

// destructure ART components
const {Surface, Shape} = ART;

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

    const initialPoints = [];
    for (let i = 0; i < props.data.points.length; i++) {
      initialPoints.push(0);
    }

    const initialData = {
      max: props.data.max,
      min: props.data.min,
      points: initialPoints,
    };

    this.state = {
      graphWidth: props.width,
      graphHeight: props.width * .5,
      linePath: null,
      scales: {
        path: null,
        ymax: {
          value: 0,
          position: [0, 0],
        },
        ymed: {
          value: 0,
          position: [0, 0],
        },
        ymin: {
          value: 0,
          position: [0, 0],
        },
      },
    };

    this.previousGraph = this.createPath(initialData);
    this.previousScales = this.createScales(initialData);

    this.state.linePath = this.previousGraph;
    this.state.scales = this.previousScales;

    this.animate = this.animate.bind(this);
    this.createPath = this.createPath.bind(this);
  }

  /**
   * React lifecycle hook - componentDidMount
   */
  componentDidMount() {
    this.computeNextState(this.props, this.state, true);
  }

  /**
   * React lifecycle hook - componentDidupdate
   */
  componentDidUpdate() {
    this.computeNextState(this.props, this.state);
  }

  /**
   * calculate the points inside the Surface from the data in (next-)props
   * @param {object}  nextProps
   * @param {object}  nextState
   * @param {boolean} initial
   */
  computeNextState(nextProps, nextState, initial = false) {
    if (initial || this.props !== nextProps || this.state !== nextState) {
      const pathFrom = this.previousGraph;
      const pathTo = this.createPath(this.props.data);

      const scalesFrom = this.previousScales;
      const scalesTo = this.createScales(this.props.data);

      cancelAnimationFrame(this.animating);
      this.animating = null;

      this.setState({
        // Create the ART Morph.Tween instance.
        linePath: Morph.Tween( // eslint-disable-line new-cap
          pathFrom,
          pathTo,
        ),
        scales: {
          ...scalesTo,
          path: Morph.Tween( // eslint-disable-line new-cap
            scalesFrom.path,
            scalesTo.path,
          ),
        },
      }, () => {
        // Kick off our animations!
        this.animate();
      });

      this.previousGraph = pathTo;
      this.previousScales = scalesTo;
    }
  }

  /**
   * trigger the animation with all necessary steps
   * @param {timestamp} start
   */
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
      this.state.scales.path.tween(delta);

      // Update our state with the new tween value and then jump back into
      // this loop.
      this.setState(this.state, () => {
        this.animate(start);
      });
    });
  }

  /**
   * caculate the offset for gettign the point on the circles ringpath
   * @param   {number} a  Ankathete
   * @param   {number} b  Gegenkathete
   * @param   {number} r  Radius
   * @return  {{x: number, y: number}}
   */
  static calcOffset(a, b, r) {
    const c = Math.sqrt((Math.pow(a, 2) + Math.pow(b, 2)));
    const alpha = Math.asin(a / c);
    const x = Math.cos(alpha) * r;
    const y = Math.sin(alpha) * r;
    return {x, y};
  }

  /**
   * create the paths for rendering
   * @param   {object}    data
   * @param   {number[]}  data.points
   * @return  {*|void}
   */
  createPath(data) {
    const {graphWidth, graphHeight} = this.state;

    const pad = sizes.gutter;
    const width = graphWidth - (3 * pad);
    const height = graphHeight - (2 * pad);

    const rad = sizes.gutter * .15;
    const xmax = data.points.length - 1;
    const ymax = ((data.max * 1.1) - ((data.max * 1.1) % 5 ) + 5);

    const p = data.points.map((point, index) => {
      const paddingOffset = pad + (((2 * (index / (data.points.length - 1))) - 1) * (0 - pad));
      return {
        x: ((index / xmax) * width) + paddingOffset,
        y: height - ((point / ymax) * height) + pad,
      };
    });

    let a = p[1].y - p[0].y;
    let b = p[1].x - p[0].x;
    let offset = LineChart.calcOffset(a, b, rad);

    let i = 1;
    // eslint-disable-next-line
    let path = Morph.Path()
      .move(p[0].x, p[0].y)
      .move(offset.x, offset.y)
      .arc(-(2 * offset.x), -(2 * offset.y), rad, rad)
      .arc(2 * offset.x, 2 * offset.y, rad, rad);

    for (i; i < p.length - 1; i++) {
      path = path
        .lineTo(p[i].x - offset.x, p[i].y - offset.y)
        .arc(2 * offset.x, 2 * offset.y, rad, rad)
        .arc(-(2 * offset.x), -(2 * offset.y), rad, rad)
        .moveTo(p[i].x, p[i].y);

      a = p[i + 1].y - p[i].y;
      b = p[i + 1].x - p[i].x;
      offset = LineChart.calcOffset(a, b, rad);

      path = path
        .move(offset.x, offset.y);
    }

    path = path
      .lineTo(p[i].x - offset.x, p[i].y - offset.y)
      .arc(2 * offset.x, 2 * offset.y, rad, rad)
      .arc(-(2 * offset.x), -(2 * offset.y), rad, rad);

    return path;
  }

  /**
   * create the scales for better understanding of the linechart
   * @param   {object}    data
   * @param   {number[]}  data.points
   * @return  {*|void}
   */
  createScales(data) {
    const {graphWidth, graphHeight} = this.state;

    const pad = sizes.gutter;
    const width = graphWidth - (3 * pad);
    const height = graphHeight - (2 * pad);

    const ymax = {
      value: ((data.max * 1.1) - ((data.max * 1.1) % 5 ) + 5),
      position: [0, 0],
    };
    const ymin = {
      value: ((data.min * .9) - ((data.min * .9) % 5 ) - 5),
      position: [0, 0],
    };
    const ymed = {
      value: ((ymax.value - ymin.value) / 2),
      position: [0, 0],
    };

    // eslint-disable-next-line
    let path = Morph.Path();
    let y = sizes.gutter;

    for (let i = 0; i <= 4; i++) {
      if (i === 0) ymax.position = [(pad / 2), y];
      if (i === 2) ymed.position = [(pad / 2), y];
      if (i === 4) ymin.position = [(pad / 2), y];

      path = path
        .moveTo((pad * 1.5), y)
        .line(width, 0);
      y += (.25 * height);
    }

    return {
      ymax,
      ymed,
      ymin,
      path,
    };
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {graphWidth, graphHeight, linePath, scales} = this.state;
    const {chartWrapper, surfaceStyle} = styles;

    return (
      <View style={chartWrapper}>
        <View style={{paddingHorizontal: sizes.gutter * .5}}>
          <Text>Test</Text>
        </View>
        <View
          style={surfaceStyle}
          onLayout={(event) => {
            this.setState({
              graphWidth: event.nativeEvent.layout.width,
              graphHeight: event.nativeEvent.layout.width * .5,
            });
          }}
        >
          <Surface width={graphWidth} height={graphHeight}>
            <Shape
              strokeWidth={1}
              stroke={colors.grey.dark}
              d={scales.path}
            />
            <Shape
              strokeWidth={2}
              stroke={colors.primary.full}
              d={linePath}
            />
          </Surface>
        </View>
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
    flexDirection: 'row',
  },
  surfaceStyle: {
    flex: 5,
  },
});

export default LineChart;
