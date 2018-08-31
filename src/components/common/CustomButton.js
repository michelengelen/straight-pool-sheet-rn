import React from 'react';
import PropType from 'prop-types';
import {View, TouchableOpacity, Text} from 'react-native';

// Custom Component imports
import {LoadingIndicator} from 'Components/common';

// Constant imports
import SPS from 'Common/variables';

const CustomButton = (props) => {
  const {containerStyle, buttonStyle, textStyle} = styles;
  const {buttonText, loading, style, ...other} = props;

  if (props.margin) {
    containerStyle.marginTop = props.margin.top || 0;
    containerStyle.marginBottom = props.margin.bottom || 0;
  }

  // Decrease opacity when the button is disabled to make a change more visible
  textStyle.opacity = props.disabled ? 0.5 : 1;

  return (
    <View style={{...containerStyle, ...style}}>
      <TouchableOpacity style={buttonStyle} {...other}>
        {loading
          ? <LoadingIndicator size={'medium'} />
          : <Text style={{...textStyle}}>{buttonText.toUpperCase()}</Text>
        }
      </TouchableOpacity>
    </View>
  );
};

CustomButton.propTypes = {
  children: PropType.node,
  style: PropType.object,
  disabled: PropType.bool,
  margin: PropType.object,
  buttonText: PropType.string.isRequired,
  loading: PropType.bool.isRequired,
};

const {colors, sizes} = SPS.variables;
const {getDimColor} = SPS;
const styles = {
  buttonStyle: {
    backgroundColor: colors.grey.dark,
    borderColor: getDimColor('rgb(0, 0, 0)', .6),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: (sizes.gutter / 2),
    maxHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: sizes.font_L,
    color: colors.text.mid,
    fontWeight: 'bold',
  },
  containerStyle: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
};

export {CustomButton};
