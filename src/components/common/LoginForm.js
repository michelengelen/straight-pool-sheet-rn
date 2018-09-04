import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import {SocialIcon, Divider} from 'react-native-elements';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {connect} from 'react-redux';

import {authActions} from 'actions';
import {AuthTextInput, CustomButton} from 'Components/common';

import {isEmpty, validateForm} from 'helpers';
import SPS from 'common/variables';

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
    this.onSignInWithFacebook = this.onSignInWithFacebook.bind(this);
  }

  /**
   * get users permission authorization (ret: facebook token)
   */
  onSignInWithFacebook() {
    const options = ['public_profile', 'email'];
    LoginManager.logInWithReadPermissions(options).then(
      (result) => {
        if (result.isCancelled) {
          console.log('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              console.log('### Data from Accesstoken: ', data);
              this.props.signInWithFacebook(data.accessToken, this.onSuccess, this.onError);
            }
          );
        }
      },
      (error) => {
        console.log('Login failed with error: ' + error);
      }
    );
  }

  onSuccess() {
    console.log('### logged in succesfully ###');
  }

  onError(error) {
    console.log('### error while logging in ###', error);
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
    const {
      socialButtonContainer,
      errorText,
      orContainer,
      orText,
      divider,
      containerView,
      socialButton,
      buttonText,
      forgotText,
    } = styles;

    return (
      <View style={{flex: 1, paddingVertical: sizes.gutter / 2}}>
        {!isEmpty(this.state.error['general']) && (
          <Text style={errorText}>{this.state.error['general']}</Text>
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
          style={{marginVertical: sizes.gutter}}
          buttonText={buttonTitle}
          loading={false}
          onPress={this.onSubmit}
        />

        <View style={orContainer}>
          <Divider style={divider} />
          <Text style={orText}>OR</Text>
        </View>

        <View style={socialButtonContainer}>
          <SocialIcon
            raised
            button
            type="facebook"
            title="Login with facebook"
            iconSize={sizes.font_L}
            style={[containerView, socialButton]}
            fontStyle={buttonText}
            onPress={this.onSignInWithFacebook}
          />
        </View>

        {this.props.onForgotPassword !== null && (
          <Text style={forgotText} onPress={onForgotPassword}>
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
  signInWithFacebook: PropTypes.func.isRequired,
  error: PropTypes.object,
};

LoginForm.defaultProps = {
  onForgotPassword: null,
};

const {colors, sizes} = SPS.variables;
const {getDimColor} = SPS;

const styles = StyleSheet.create({
  errorText: {
    color: colors.useCase.foul,
    marginTop: 20,
  },
  containerView: {
    margin: 0,
  },
  socialButton: {
    marginTop: 0,
    marginBottom: 0,
    borderColor: getDimColor(colors.grey.mid, .8),
    borderRadius: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: (sizes.gutter / 2),
    maxHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonContainer: {
    marginVertical: sizes.gutter,
  },
  buttonText: {
    fontSize: sizes.font_M,
  },
  forgotText: {
    textAlign: 'center',
    color: colors.textColorDim,
    marginBottom: sizes.gutter,
    fontSize: sizes.font_S,
  },

  orContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: sizes.dimensions.width,
  },

  divider: {
    backgroundColor: colors.textColorDim,
    position: 'absolute',
    top: 19,
    left: 20,
    right: 20,
  },

  orText: {
    backgroundColor: colors.grey.darkest,
    fontSize: sizes.font_M,
    color: colors.textColor,
    paddingHorizontal: sizes.gutter / 2,
  },
});

const {signInWithFacebook} = authActions;
const connectedLoginForm = connect(null, {signInWithFacebook})(LoginForm);

export {connectedLoginForm as LoginForm};
