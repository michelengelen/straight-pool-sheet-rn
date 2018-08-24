import React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native';

import {InputContainer} from './InputContainer';

// Constant import
import SPS from 'Common/variables';

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => {
  const {inputStyle} = styles;

  return (
    <InputContainer headline={label}>
      <TextInput
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.text.mid}
      />
    </InputContainer>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool.isRequired,
};

const {colors, sizes} = SPS.variables;
const {getDimColor} = SPS;
const styles = {
  inputStyle: {
    backgroundColor: getDimColor(colors.grey.darkest),
    borderRadius: 3,
    borderColor: colors.text.mid,
    borderBottomWidth: 2,
    color: colors.text.light,
    padding: (sizes.gutter / 2),
    fontSize: sizes.font_L,
    lineHeight: sizes.gutter,
  },
  labelStyle: {
    color: colors.text.light,
    fontSize: sizes.font_L,
    padding: (sizes.gutter / 4),
  },
};

export {CustomInput};
