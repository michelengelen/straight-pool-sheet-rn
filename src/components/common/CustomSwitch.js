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
      this.props.value ? (this.props.switchWidth / 2) : 0
    );

    this.handleSwitch = this.handleSwitch.bind(this);
  }

  /**
   * handle pressing the switch
   * @param {function} callback
   */
  handleSwitch(callback) {
    const {currentValue} = this.state;

    Animated.timing(this.thumbPosition, {
      toValue: !currentValue ? (this.props.switchWidth / 2) : 0,
      duration: 300,
    }).start(() => {
      callback && callback(!currentValue);
      this.setState({currentValue: !currentValue});
    });
  }

  /**
   * renders the Switch
   * @return {jsx}
   */
  renderSwitch() {
    const {onChange, switchWidth} = this.props;
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
      <TouchableOpacity
        onPress={() => this.handleSwitch(onChange)}
        style={{...switchContainerStyle, width: switchWidth}}
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
    );
  }

  /**
   * Render Function for the CustomSwitch component
   * @return {*}
   */
  render() {
    const {description, label} = this.props;

    return (
      <InputContainer
        headline={label}
        description={description}
        component={this.renderSwitch()}
      />
    );
  }
}

CustomSwitch.propTypes = {
  label: PropType.string,
  description: PropType.string,
  value: PropType.bool.isRequired,
  switchWidth: PropType.number.isRequired,
  onChange: PropType.func,
};

const {colors, sizes} = SPS.variables;
const styles = {
  switchContainerStyle: {
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
