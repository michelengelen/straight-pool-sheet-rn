import React, {PureComponent} from 'react';
import PropType from 'prop-types';

import {View} from 'react-native';

import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import {isEmpty} from 'helpers';
import SPS from 'Common/variables';

/**
 * creates a TextInput for the LoginForm
 */
class AuthTextInput extends PureComponent {
  render() {
    const {
      showLabel,
      placeholder,
      autoFocus,
      onChangeText,
      secureTextEntry,
      placeholderTextColor,
      keyboardType,
    } = this.props;

    return (
      <View style={styles.container}>
        {
          (showLabel) &&
            <FormLabel>{this.props.label}</FormLabel>
        }
        <FormInput
          autoCapitalize='none'
          clearButtonMode='while-editing'
          underlineColorAndroid={'#fff'}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputContainer}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          value={this.props.value}/>
        {
          (!isEmpty(this.props.error)) &&
            <FormValidationMessage>
              {this.props.error}
            </FormValidationMessage>
        }
      </View>
    );
  }
}

AuthTextInput.propTypes = {
  showLabel: PropType.bool,
  label: PropType.oneOfType([
    PropType.string,
    PropType.number,
  ]),
  placeholder: PropType.string,
  placeholderTextColor: PropType.string,
  autoFocus: PropType.bool,
  onChangeText: PropType.func.isRequired,
  secureTextEntry: PropType.bool,
  keyboardType: PropType.string,
  value: PropType.string,
  error: PropType.string,
};

AuthTextInput.defaultProps = {
  autoFocus: false,
  secureTextEntry: false,
  placeholderTextColor: 'grey',
  keyboardType: 'default',
};


const {colors, sizes} = SPS.variables;
const {getDimColor} = SPS;
const styles = {
  container: {
    width: '100%',
    backgroundColor: colors.grey.dark,
    padding: (sizes.gutter / 2),
  },
  inputContainer: {
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

export {AuthTextInput};
