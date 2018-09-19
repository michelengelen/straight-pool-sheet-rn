import React, {Component} from 'react';
import PropType from 'prop-types';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {
  CustomButton,
  LoginForm,
  SceneContainer,
  RegisterForm,
} from 'components/common';

import {getAuth} from 'reducers/AuthReducer';
import {getAppState} from 'reducers/CommonReducer';
import SPS from 'common/variables';
import {i18n} from 'assets';

import {authActions} from 'actions';
import {AccessToken, LoginManager} from 'react-native-fbsdk';

// TODO: move this to helper function or constants
const fields = {
  register: [
    {
      key: 'email',
      label: 'Email Address',
      placeholder: 'Email Address',
      autoFocus: false,
      secureTextEntry: false,
      value: '',
      type: 'email',
    },
    {
      key: 'username',
      label: 'Username',
      placeholder: 'Username',
      autoFocus: false,
      secureTextEntry: false,
      value: '',
      type: 'text',
    },
    {
      key: 'password',
      label: 'Password',
      placeholder: 'Password',
      autoFocus: false,
      secureTextEntry: true,
      value: '',
      type: 'password',
    },
    {
      key: 'confirm_password',
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      autoFocus: false,
      secureTextEntry: true,
      value: '',
      type: 'confirm_password',
    },
  ],
  login: [
    {
      key: 'email',
      label: 'Email Address',
      placeholder: 'Email Address',
      autoFocus: false,
      secureTextEntry: false,
      value: '',
      type: 'email',
    },
    {
      key: 'password',
      label: 'Password',
      placeholder: 'Password',
      autoFocus: false,
      secureTextEntry: true,
      value: '',
      type: 'password',
    },
  ],
};

const error = {
  register: {
    general: '',
    email: '',
    password: '',
    confirm_password: '',
  },
  login: {
    general: '',
    email: '',
    password: '',
  },
};

/**
 * LoginRegister component which renders either a Login-/Register-Form or the UserProfile
 */
class LoginRegister extends Component {
  /**
   * react constructor call
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      error: error,
      register: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
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
          this.onError({message: 'User cancelled the authentication via facebook'});
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              this.props.signInWithFacebook(data.accessToken, this.onSuccess, this.onError);
            }
          );
        }
      },
      (error) => {
        /* eslint-disable-next-line */
          console.log('Login failed with error: ' + error);
      }
    );
  }

  /**
   * handle the submit of the register-/login-form
   * @param {object} formData
   */
  onSubmit(formData) {
    this.setState({error: error}); // clear out error messages

    if (this.state.register) {
      this.props.registerUser(formData, this.onSuccess, this.onError);
    } else {
      this.props.loginUser(formData, this.onSuccess, this.onError);
    }
  }

  /**
   * succes callback for the onSubmit function
   * @param {string} target
   */
  async onSuccess(target) {
    await this.props.navigation.navigate(target);
  }

  /**
   * error callback for the onSubmit function
   * @param {object} error
   */
  onError(error) {
    let errObj = this.state.register
      ? {...this.state.error.register}
      : {...this.state.error.login};

    if (error.hasOwnProperty('message')) {
      errObj['general'] = error.message;
    } else {
      let keys = Object.keys(error);
      keys.map((key) => {
        errObj[key] = error[key];
      });
    }

    if (this.state.register) {
      this.setState({
        error: {
          register: errObj,
        },
      });
    } else {
      this.setState({
        error: {
          login: errObj,
        },
      });
    }
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {appState} = this.props;
    const {register} = this.state;
    const {ctaTextStyle, infoTextStyle} = styles;

    if (!appState.online) {
      return (
        <SceneContainer
          scrollable={false}
          style={{alignItems: 'stretch', justifyContent: 'center'}}
        >
          <View>
            <Text style={infoTextStyle}>{i18n.t('loginRegister.notOnline')}</Text>
            <CustomButton
              loading={false}
              iconLeft={'md-arrow-back'}
              buttonText={i18n.t('buttons.back')}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        </SceneContainer>
      );
    }

    if (this.state.register) {
      return (
        <SceneContainer
          scrollable={false}
          style={{alignItems: 'stretch', justifyContent: 'center'}}
        >
          <RegisterForm
            fields={fields.register}
            showLabel={false}
            onSubmit={this.onSubmit}
            buttonTitle={'SIGN UP'}
            error={this.state.error.register}
          />
          <Text style={ctaTextStyle}>{'Already have an account?'}</Text>
          <CustomButton
            loading={false}
            buttonText={'Login to your account'}
            onPress={() => this.setState({register: !register})}
          />
        </SceneContainer>
      );
    }

    return (
      <SceneContainer
        scrollable={false}
        style={{alignItems: 'stretch', justifyContent: 'center'}}
      >
        <LoginForm
          fields={fields.login}
          showLabel={false}
          onSubmit={this.onSubmit}
          buttonTitle={'SIGN IN'}
          error={this.state.error.login}
          signInWithFacebook={() => this.onSignInWithFacebook()}
        />
        <Text style={ctaTextStyle}>{'New to the App? '}</Text>
        <CustomButton
          loading={false}
          buttonText={'Create account'}
          onPress={() => this.setState({register: !register})}
        />
      </SceneContainer>
    );
  }
}

LoginRegister.propTypes = {
  authState: PropType.shape({
    isLoggedIn: PropType.bool.isRequired,
    user: PropType.object,
  }),
  appState: PropType.object,
  registerUser: PropType.func.isRequired,
  loginUser: PropType.func.isRequired,
  signInWithFacebook: PropType.func.isRequired,
  navigation: PropType.object,
};

LoginRegister.navigationOptions = {

};

const {colors, sizes} = SPS.variables;
const styles = {
  ctaTextStyle: {
    fontSize: sizes.font_M,
    textAlign: 'center',
    color: colors.textColorDim,
    marginVertical: sizes.gutter / 4,
  },
  infoTextStyle: {
    fontSize: sizes.font_M,
    color: colors.textColorDim,
    padding: sizes.gutter,
    marginVertical: sizes.gutter / 4,
  },
};

const mapStateToProps = (state) => {
  return {
    ...getAuth(state),
    ...getAppState(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  registerUser: () =>
    dispatch(authActions.register()),
  loginUser: () =>
    dispatch(authActions.login()),
  signInWithFacebook: async (fbToken, successCB, errorCB) =>
    await dispatch(authActions.signInWithFacebook(fbToken, successCB, errorCB)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(LoginRegister)
);
