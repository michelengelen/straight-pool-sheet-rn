import React, {Component} from 'react';
import PropType from 'prop-types';
// import {Slider, View, Text} from 'react-native';
import {View, Text} from 'react-native';

import {InputContainer} from './InputContainer';
import AwesomeSlider from './AwesomeSlider';
import SPS from 'Common/variables';

/**
 * CustomSlider which updates label itself,
 * without using the HOC which implements it
 */
class CustomSlider extends Component {
  /**
   * Constructor Call
   * @param {*} props
   */
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    this.renderThumbComponent = this.renderThumbComponent.bind(this);

    // Set the state directly. Use props if necessary.
    this.state = {
      currentValue: this.props.value,
    };
  }

  /**
   * Renders the thumb with the current Value inside
   * (gets passed to the customSlider)
   *
   * @return {jsx}
   */
  renderThumbComponent() {
    const {thumbStyle, thumbTextStyle} = styles;

    return (
      <View style={thumbStyle}>
        <Text style={thumbTextStyle}>{'|||'}</Text>
      </View>
    );
  }

  /**
   * Render Function for the CustomSlider component
   * @return {*}
   */
  render() {
    const {
      label,
      value,
      minimumValue,
      maximumValue,
      onSlidingComplete,
    } = this.props;
    const {
      inputStyle,
      trackStyle,
      sliderContainerStyle,
    } = styles;

    return (
      <InputContainer headline={label} value={this.state.currentValue}>
        <View style={sliderContainerStyle}>
          <AwesomeSlider
            minimumValue={minimumValue}
            maximumValue={maximumValue}
            minimumTrackTintColor={colors.primary.full}
            maximumTrackTintColor={colors.grey.darkest}
            trackStyle={trackStyle}
            thumbSize={{width: 24, height: 16}}
            style={inputStyle}
            value={value}
            step={5}
            onSlidingComplete={onSlidingComplete}
            thumbComponent={this.renderThumbComponent()}
            onValueChange={(value) => this.setState({currentValue: value})}
          />
        </View>
      </InputContainer>
    );
  }
}

CustomSlider.propTypes = {
  label: PropType.string,
  value: PropType.number.isRequired,
  minimumValue: PropType.number.isRequired,
  maximumValue: PropType.number.isRequired,
  onSlidingComplete: PropType.func.isRequired,
};

const {colors, sizes} = SPS.variables;
const styles = {
  sliderContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: 5,
    padding: 0,
    borderColor: colors.grey.darkest,
    backgroundColor: colors.grey.darkest,
  },
  inputStyle: {
    flex: 1,
    height: 18,
  },
  trackStyle: {
    height: 16,
    borderRadius: 3,
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
  },
  thumbTextStyle: {
    textAlign: 'center',
    color: colors.text.dark,
    fontSize: sizes.font_S,
    fontWeight: 'bold',
  },
};

export {CustomSlider};
