import React, {Component} from 'react';
import PropType from 'prop-types';
import {Slider, View, Text} from 'react-native';

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

    // Set the state directly. Use props if necessary.
    this.state = {
      currentValue: this.props.value,
    };
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
      labelStyle,
      containerStyle,
      sliderContainerStyle,
      valueSelectedStyle,
      valueContainer,
    } = styles;
    const {currentValue} = this.state;

    return (
      <View style={containerStyle}>
        {label && <Text style={labelStyle}>{label}</Text>}
        <View style={sliderContainerStyle}>
          <Slider
            minimumValue={minimumValue}
            maximumValue={maximumValue}
            style={inputStyle}
            value={value}
            step={5}
            onSlidingComplete={onSlidingComplete}
            onValueChange={(value) => this.setState({currentValue: value})}
          />
          <View style={valueContainer}>
            <Text style={valueSelectedStyle}>
              {currentValue}
            </Text>
          </View>
        </View>
      </View>
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
  containerStyle: {
    padding: sizes.gutter,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  labelStyle: {
    color: colors.textColor,
    fontSize: sizes.font_L,
    padding: (sizes.gutter / 4),
  },
  sliderContainerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  inputStyle: {
    flex: 6,
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  valueSelectedStyle: {
    color: colors.textColor,
    padding: (sizes.gutter / 4),
  },
};

export {CustomSlider};
