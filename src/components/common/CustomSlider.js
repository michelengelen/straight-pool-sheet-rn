import React, {Component} from 'react';
import PropType from 'prop-types';
import {Slider, View, Text} from 'react-native';

// Constant import
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
      value: this.props.value,
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
      valueSelectedStyle,
      valueRangeStyle,
      valueContainer,
    } = styles;

    return (
      <View style={containerStyle}>
        {label && <Text style={labelStyle}>{label}</Text>}
        <Slider
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          style={inputStyle}
          value={value}
          step={5}
          onSlidingComplete={onSlidingComplete}
          onValueChange={(value) => this.setState({value})}
        />
        <View style={valueContainer}>
          <Text style={valueRangeStyle}>
            {minimumValue}
          </Text>
          <Text style={valueSelectedStyle}>
            {this.state.value}
          </Text>
          <Text style={valueRangeStyle}>
            {maximumValue}
          </Text>
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
const {dimensions} = sizes;
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
  inputStyle: {
    width: (dimensions.width - 2 * sizes.gutter),
  },
  valueContainer: {
    width: (dimensions.width - 2 * sizes.gutter),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueRangeStyle: {
    fontSize: sizes.font_S,
    color: colors.textColorDim,
    padding: (sizes.gutter / 4),
  },
  valueSelectedStyle: {
    color: colors.textColor,
    padding: (sizes.gutter / 4),
  },
};

export {CustomSlider};
