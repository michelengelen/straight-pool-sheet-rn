import React from 'react';
import { TextInput, View, Text } from 'react-native';

import SPS from '../../common/variables';

const CustomInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
      {label && <Text style={labelStyle}>{label}</Text>}
    </View>
  );
};

const { colors } = SPS.variables;
const styles = {
  inputStyle: {
    backgroundColor: colors.backgroundColor,
    borderBottomWidth: 2,
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
    alignItems: 'stretch'
  }
};

export { CustomInput };