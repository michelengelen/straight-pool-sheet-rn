import React from 'react';
import PropType from 'prop-types';
import {View, TouchableOpacity, Text} from 'react-native';

// Constant import
import SPS from 'Common/variables';

const CustomButton = (props) => {
  const {containerStyle, buttonStyle, textStyle} = styles;
  const {title, ...other} = props;

  return (
    <View style={containerStyle}>
      <TouchableOpacity style={buttonStyle} {...other}>
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

CustomButton.propTypes = {
  title: PropType.string.isRequired,
  children: PropType.node,
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
