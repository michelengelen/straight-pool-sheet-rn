import React, {Component} from 'react';
import PropType from 'prop-types';
import {Icon} from 'react-native-elements';
import {View, Text, TouchableOpacity, Animated} from 'react-native';

import {InputContainer} from './InputContainer';
import SPS from 'common/variables';

/**
 * CustomSwitch which updates label itself,
 * without using the HOC which implements it
 */
class CustomSwitch extends Component {
  /**
   * Constructor Call
   * @param {*} props
   */
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly
    this.state = {
      currentValue: this.props.value,
    };

    this.thumbPosition = new Animated.Value(
      this.props.value ? this.props.switchWidth : 0
    );

    this.handleSwitch = this.handleSwitch.bind(this);
  }

  /**
   * handle pressing the switch
   */
  handleSwitch() {
    const {currentValue} = this.state;

    Animated.timing(this.thumbPosition, {
      toValue: !currentValue ? (this.props.switchWidth / 2) : 0,
      duration: 300,
    }).start(() => {
      this.setState({currentValue: !currentValue});
    });
  }

  /**
   * Render Function for the CustomSwitch component
   * @return {*}
   */
  render() {
    const {label} = this.props;
    const {
      switchContainerStyle,
      thumbStyle,
      thumbTextStyle,
      iconContainerStyle,
      iconStyle,
    } = styles;

    const combinedThumbStyle = {
      transform: [
        {
          translateX: this.thumbPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ],
    };

    return (
      <InputContainer headline={label}>
        <TouchableOpacity
          onPress={() => this.handleSwitch()}
          style={switchContainerStyle}
          activeOpacity={1}
        >
          <View style={iconContainerStyle}>
            <Icon
              type={'ionicon'}
              name={'md-checkmark'}
              color={'green'}
              iconStyle={iconStyle}
            />
            <Icon
              type={'ionicon'}
              name={'md-close'}
              color={'red'}
              iconStyle={iconStyle}
            />
          </View>
          <Animated.View style={{...thumbStyle, ...combinedThumbStyle}}>
            <Text style={thumbTextStyle}>{'|||'}</Text>
          </Animated.View>
        </TouchableOpacity>
      </InputContainer>
    );
  }
}

CustomSwitch.propTypes = {
  label: PropType.string,
  value: PropType.bool.isRequired,
  switchWidth: PropType.number.isRequired,
  onTrueHandler: PropType.func,
  onFalseHandler: PropType.func,
};

const {colors, sizes} = SPS.variables;
const styles = {
  switchContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: 5,
    padding: 0,
    width: 58,
    height: 22,
    borderColor: colors.grey.darkest,
    backgroundColor: colors.grey.darkest,
  },
  thumbStyle: {
    borderRadius: 3,
    width: 24,
    height: 16,
    backgroundColor: colors.grey.dark,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: .75,
    elevation: 2,
    position: 'absolute',
    left: 0,
    zIndex: 10,
  },
  thumbTextStyle: {
    textAlign: 'center',
    color: colors.text.dark,
    fontSize: sizes.font_S,
    fontWeight: 'bold',
  },
  iconContainerStyle: {
    position: 'absolute',
    zIndex: 2,
    flexDirection: 'row',
    left: 0,
    right: 0,
    justifyContent: 'space-around',
  },
  iconStyle: {
    flex: 1,
    fontSize: 16,
  },
};

export {CustomSwitch};
