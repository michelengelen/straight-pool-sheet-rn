import React, {PureComponent} from 'react';
import {Animated} from 'react-native';

class Fade extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: this.props.visible ? 10 : -1,
    };

    this._visibility = new Animated.Value(this.props.visible ? 1 : 0);

    this.animationCallback = this.animationCallback.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      this._visibility.setValue(
        this.props.visible ? 0 : 1,
      );

      Animated.timing(this._visibility, {
        toValue: this.props.visible ? 1 : 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        this.setState({
          zIndex: this.props.visible ? 10 : -1,
        });
      });
    }
  }

  animationCallback() {
    this.setState({
      zIndex: this.props.visible ? 10 : -1,
    });
  }

  render() {
    const {style, children, ...rest} = this.props;

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
      zIndex: this.state.zIndex,
    };

    const combinedStyle = [containerStyle, style];

    console.log('state: ', this.state.zIndex);
    console.log('style: ', containerStyle.zIndex);
    return (
      <Animated.View style={combinedStyle} {...rest}>
        {children}
      </Animated.View>
    );
  }
}

export {Fade};
