import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

import {isEmpty, validateForm} from 'helpers';
import {AuthTextInput} from 'Components/common';

import SPS from 'Common/variables';

class RegisterForm extends PureComponent {
  constructor(props) {
    super(props);

    const {fields, error} = props;

    this.state = this.createState(fields, error);

    // bind functions
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

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

  onSubmit() {
    const data = this.state;
    const result = validateForm(data);

    console.log(result);

    if (!result.success) this.setState({error: result.error});
    else this.props.onSubmit(this.extractData(data));
  }

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

  onChange(key, text) {
    const state = this.state;
    state[key]['value'] = text;
    this.setState(state);
  }

  render() {
    const {fields, showLabel, buttonTitle, onForgotPassword} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {
            (!isEmpty(this.state.error['general'])) &&
              <Text style={styles.errorText}>{this.state.error['general']}</Text>
          }

          {
            fields.map((data, idx) => {
              let {key, label, placeholder, autoFocus, secureTextEntry, keyboardType} = data;
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
            })
          }

          <Button
            raised
            title={buttonTitle}
            borderRadius={0}
            containerViewStyle={styles.containerView}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={this.onSubmit}/>
          {
            this.props.onForgotPassword !== null &&
              <Text style={styles.forgotText} onPress={onForgotPassword}>
                Forgot password?</Text>
          }

        </View>
      </View>
    );
  }
}

RegisterForm.propTypes = {
  fields: PropTypes.array,
  showLabel: PropTypes.bool,
  buttonTitle: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
  error: PropTypes.object,
};


RegisterForm.defaultProps = {
  onForgotPassword: null,
};

const {colors, sizes} = SPS.variables;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey.light,
  },

  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    color: colors.useCase.foul,
    width: (sizes.dimensions.width - 45),
    marginTop: 20,
  },

  containerView: {
    marginVertical: sizes.gutter,
    width: sizes.dimensions.width - 40,
  },

  socialButton: {
    height: 55,
    borderRadius: 4,
    marginTop: 0,
    marginBottom: 0,
  },

  button: {
    backgroundColor: '#FF553F',
    height: 55,
  },

  buttonText: {
    fontSize: sizes.font_M + 2,
  },

  forgotText: {
    textAlign: 'center',
    color: colors.grey.darkest,
    marginBottom: sizes.gutter,
    fontSize: sizes.font_S,
  },
});

export {RegisterForm};