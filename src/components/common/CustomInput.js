import React from 'react';
import PropTypes from 'prop-types';
import {TextInput, View, Text} from 'react-native';

// Constant import
import SPS from 'Common/variables';

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => {
  const {inputStyle, labelStyle, containerStyle} = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.textColorDim}
      />
      {label && <Text style={labelStyle}>{label}</Text>}
    </View>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool.isRequired,
};

const {colors} = SPS.variables;
const styles = {
  inputStyle: {
    backgroundColor: colors.backgroundColors.dimm,
    borderColor: colors.textColorDim,
    color: colors.textColor,
    padding: 10,
    fontSize: 18,
    lineHeight: 23,
  },
  labelStyle: {
    color: colors.textColor,
    fontSize: 10,
    padding: 5,
  },
  containerStyle: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
};

export {CustomInput};
