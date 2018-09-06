import React, {PureComponent} from 'react';
import {Animated} from 'react-native';

class Fade extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  componentWillMount() {
    this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({visible: true});
    }
    Animated.timing(this._visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: 600,
    }).start(() => {
      this.setState({visible: nextProps.visible});
    });
  }

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
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: visible ? 10 : 0,
    };

    const combinedStyle = [containerStyle, style];
    return (
      <Animated.View
        style={visible ? combinedStyle : containerStyle}
        {...rest}
      >
        {visible ? children : null}
      </Animated.View>
    );
  }
}

export {Fade};
