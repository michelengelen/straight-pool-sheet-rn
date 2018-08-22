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
    const {currentValue} = this.state;
    const {thumbStyle, thumbTextStyle} = styles;

    return (
      <View style={thumbStyle}>
        <Text style={thumbTextStyle}>{currentValue}</Text>
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
      <InputContainer headline={label}>
        <View style={sliderContainerStyle}>
          <AwesomeSlider
            minimumValue={minimumValue}
            maximumValue={maximumValue}
            minimumTrackTintColor={colors.backgroundColors.primary}
            maximumTrackTintColor={colors.backgroundColors.darkest}
            trackStyle={trackStyle}
            thumbSize={{width: 45, height: 24}}
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
    borderColor: colors.backgroundColors.darkest,
    backgroundColor: colors.backgroundColors.darkest,
  },
  inputStyle: {
    flex: 1,
    height: 26,
  },
  trackStyle: {
    height: 22,
    borderRadius: 3,
  },
  thumbStyle: {
    borderRadius: 3,
    width: 45,
    height: 24,
    backgroundColor: colors.backgroundColors.dark,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: .75,
    elevation: 2,
  },
  thumbTextStyle: {
    textAlign: 'center',
    color: colors.textColor,
    fontSize: sizes.font_M,
    fontWeight: 'bold',
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
