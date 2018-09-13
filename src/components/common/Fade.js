import React, {PureComponent} from 'react';
import {Animated} from 'react-native';

import SPS from 'common/variables';
const {sizes} = SPS.variables;

/**
 * Wrapper class for full-screen Loading-Indicator
 */
class Fade extends PureComponent {
  /**
   * react constructor call
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
    };

    // create the Value for the animation
    this._visibility = new Animated.Value(props.visible ? 1 : 0);
  }

  /**
   * react lifecycle method
   *
   * @param {object} props
   * @param {object} state
   * @return {*}
   */
  static getDerivedStateFromProps(props, state) {
    // only return new state when previous state is false
    if (props.visible && !state.visible) {
      return {
        visible: props.visible,
      };
    }

    return null;
  }

  /**
   * react lifecycle method
   *
   * @param {object} prevProps
   */
  componentDidUpdate(prevProps) {
    // only render the animation when previous props are unequal to the current
    if (prevProps.visible !== this.props.visible) {
      // set new Value based on prop
      this._visibility.setValue(
        this.props.visible ? 0 : 1,
      );

      // start the animation
      Animated.timing(this._visibility, {
        toValue: this.props.visible ? 1 : 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        // when the animation is finished call setState
        this.setState({
          visible: this.props.visible,
        });
      });
    }
  }

  /**
   * react render function
   * @return {jsx}
   */
  render() {
    const {style, children, ...rest} = this.props;
    const {visible} = this.state;

    const containerStyle = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this._visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [3, 1],
          }),
        },
      ],
      flex: 1,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: sizes.dimensions.width,
      height: sizes.dimensions.height,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: visible ? 10 : -1,
    };

    // containerStyles have higher precedence
    const combinedStyle = [style, containerStyle];

    return (
      <Animated.View style={combinedStyle} {...rest}>
        {visible ? children : null}
      </Animated.View>
    );
  }
}

export {Fade};
