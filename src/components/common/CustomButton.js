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
  buttonStyle.borderColor = props.disabled
    ? colors.text.mid
    : colors.primary.full;

  return (
    <View style={containerStyle}>
      <TouchableOpacity style={buttonStyle} {...other}>
        {loading
          ? <LoadingIndicator size={'medium'} />
          : <Text style={textStyle}>{buttonText.toUpperCase()}</Text>
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
    // backgroundColor: colors.backgroundColors.dim,
    borderColor: colors.text.mid,
    borderWidth: 1,
    padding: (sizes.gutter / 2),
    marginTop: sizes.gutter,
    marginBottom: sizes.gutter,
    width: (sizes.dimensions.width - 2 * sizes.gutter),
    maxWidth: '80%',
    maxHeight: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: sizes.font_L,
    color: colors.text.light,
  },
  containerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export {CustomButton};
