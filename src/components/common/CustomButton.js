import React from 'react';
import PropType from 'prop-types';
import {View, TouchableOpacity, Text} from 'react-native';

// Custom Component imports
import {LoadingIndicator} from 'Components/common';

// Constant imports
import SPS from 'Common/variables';

const CustomButton = (props) => {
  const {containerStyle, buttonStyle, textStyle} = styles;
  const {buttonText, loading, ...other} = props;

  // Decrease opacity when the button is disabled to make a change more visible
  buttonStyle.opacity = props.disabled ? 0.5 : 1;

  return (
    <View style={containerStyle}>
      <TouchableOpacity style={buttonStyle} {...other}>
        {loading
          ? <LoadingIndicator size={'medium'} />
          : <Text style={textStyle}>{buttonText}</Text>
        }
      </TouchableOpacity>
    </View>
  );
};

CustomButton.propTypes = {
  buttonText: PropType.string.isRequired,
  children: PropType.node,
  disabled: PropType.bool,
  loading: PropType.bool.isRequired,
};

const {colors, sizes} = SPS.variables;
const styles = {
  buttonStyle: {
    // backgroundColor: colors.backgroundColors.dimm,
    borderColor: colors.textColor,
    borderWidth: 2,
    padding: (sizes.gutter / 2),
    marginTop: sizes.gutter,
    marginBottom: sizes.gutter,
    width: (sizes.dimensions.width - 2 * sizes.gutter),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: sizes.font_XL,
    fontWeight: 'bold',
    color: colors.textColor,
  },
  containerStyle: {
    padding: sizes.gutter,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
};

export {CustomButton};
