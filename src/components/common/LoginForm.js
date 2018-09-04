import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';

import {AuthTextInput, CustomButton} from 'Components/common';

import {isEmpty, validateForm} from 'helpers';
import SPS from 'Common/variables';

/**
 * LoginForm component
 */
class LoginForm extends PureComponent {
  /**
   * react constructor function
   * @param {object} props
   */
  constructor(props) {
    super(props);

    const {fields, error} = props;

    this.state = this.createState(fields, error);

    // bind functions
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * create the state from the provided params
   * @param {object[]} fields
   * @param {object} error
   * @return {object} state
   */
  createState(fields, error) {
    // create the state
    const state = {};
    fields.forEach((field) => {
      let {key, type, value} = field;
      state[key] = {type: type, value: value};
    });

    state['error'] = error;
    return state;
  }

  /**
   * handle the form submit
   */
  onSubmit() {
    const data = this.state;
    const result = validateForm(data);

    if (!result.success) this.setState({error: result.error});
    else this.props.onSubmit(this.extractData(data));
  }

  /**
   * extract the data from the form
   * @param {object} data
   * @return {object} retData
   */
  extractData(data) {
    const retData = {};

    Object.keys(data).forEach(function(key) {
      if (key !== 'error') {
        let {value} = data[key];
        retData[key] = value;
      }
    });

    return retData;
  }

  /**
   * handle the input in a field
   * @param {string} key
   * @param {string} text
   */
  onChange(key, text) {
    const state = this.state;
    state[key]['value'] = text;
    this.setState(state);
  }

  /**
   * react render fundtion
   * @return {*}
   */
  render() {
    const {fields, showLabel, buttonTitle, onForgotPassword} = this.props;

    return (
      <View style={{flex: 1, paddingVertical: sizes.gutter / 2}}>
        {!isEmpty(this.state.error['general']) && (
          <Text style={styles.errorText}>{this.state.error['general']}</Text>
        )}

        {fields.map((data, idx) => {
          let {
            key,
            label,
            placeholder,
            autoFocus,
            secureTextEntry,
            keyboardType,
          } = data;
          return (
            <AuthTextInput
              key={key}
              label={label}
              showLabel={showLabel}
              placeholder={placeholder}
              autoFocus={autoFocus}
              onChangeText={(text) => this.onChange(key, text)}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              value={this.state[key]['value']}
              error={this.state.error[key]}
            />
          );
        })}

        <CustomButton
          style={{marginVertical: sizes.gutter / 2}}
          buttonText={buttonTitle}
          loading={false}
          onPress={this.onSubmit}
        />

        {this.props.onForgotPassword !== null && (
          <Text style={styles.forgotText} onPress={onForgotPassword}>
              Forgot password?
          </Text>
        )}
      </View>
    );
  }
}

LoginForm.propTypes = {
  fields: PropTypes.array,
  showLabel: PropTypes.bool,
  buttonTitle: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
  error: PropTypes.object,
};

LoginForm.defaultProps = {
  onForgotPassword: null,
};

const {colors, sizes} = SPS.variables;

const styles = StyleSheet.create({
  errorText: {
    color: colors.useCase.foul,
    marginTop: 20,
  },
  containerView: {
    marginVertical: sizes.gutter,
  },
  socialButton: {
    height: 55,
    borderRadius: 4,
    marginTop: 0,
    marginBottom: 0,
  },
  buttonText: {
    fontSize: sizes.font_M + 2,
  },
  forgotText: {
    textAlign: 'center',
    color: colors.textColorDim,
    marginBottom: sizes.gutter,
    fontSize: sizes.font_S,
  },
});

export {LoginForm};
