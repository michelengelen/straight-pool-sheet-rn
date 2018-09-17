import React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native';

// Constant import
import SPS from 'common/variables';

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  disabled = false,
  style,
}) => {
  const {inputStyle} = styles;

  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      autoCorrect={false}
      style={{...inputStyle, ...style}}
      value={value}
      onChangeText={onChangeText}
      placeHolder={placeholder}
      editable={!disabled}
      placeholderTextColor={colors.text.mid}
    />
  );
};

CustomInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool.isRequired,
};

const {colors, sizes} = SPS.variables;
const styles = {
  inputStyle: {
    flex: 1,
    backgroundColor: colors.grey.darker,
    borderRadius: 3,
    borderColor: colors.text.mid,
    borderBottomWidth: 2,
    color: colors.text.light,
    padding: (sizes.gutter / 2),
    fontSize: sizes.font_L,
    lineHeight: sizes.gutter,
  },
};

export {CustomInput};
