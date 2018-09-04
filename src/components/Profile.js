import React, {Component} from 'react';
import PropType from 'prop-types';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {
  CustomButton,
  LoginForm,
  PageContainer,
  RegisterForm
} from 'Components/common';
import UserProfile from 'Components/profile/UserProfile';

import {getAuth} from 'Reducers/AuthReducer';
import SPS from 'common/variables';

import {authActions} from 'actions';
const {register, login} = authActions;

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
 * Profile component which renders either a Login-/Register-Form or the UserProfile
 */
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: error,
      register: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  onSubmit(data) {
    this.setState({error: error}); // clear out error messages

    if (this.state.register) {
      this.props.register(data, this.onSuccess, this.onError);
    } else {
      this.props.login(data, this.onSuccess, this.onError);
    }
  }

  onSuccess(user) {
    this.props.navigation.navigate('Home');
  }

  onError(error) {
    let errObj = this.state.register
      ? {...this.state.error.register}
      : {...this.state.error.login};

    if (error.hasOwnProperty('message')) {
      errObj['general'] = error.message;
    } else {
      let keys = Object.keys(error);
      keys.map((key, index) => {
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

  render() {
    const {register} = this.state;
    const {ctaTextStyle} = styles;

    if (this.props.authState.isLoggedIn) {
      return <UserProfile user={this.props.authState.user} />;
    }

    if (this.state.register) {
      return (
        <PageContainer
          pageTitle={'REGISTER'}
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
        </PageContainer>
      );
    }

    return (
      <PageContainer
        pageTitle={'LOGIN'}
        scrollable={false}
        style={{alignItems: 'stretch', justifyContent: 'center'}}
      >
        <LoginForm
          fields={fields.login}
          showLabel={false}
          onSubmit={this.onSubmit}
          buttonTitle={'SIGN IN'}
          error={this.state.error.login}
        />
        <Text style={ctaTextStyle}>{'New to the App? '}</Text>
        <CustomButton
          loading={false}
          buttonText={'Create account'}
          onPress={() => this.setState({register: !register})}
        />
      </PageContainer>
    );
  }
}

Profile.propTypes = {
  authState: PropType.shape({
    isLoggedIn: PropType.bool.isRequired,
    user: PropType.oneOf([PropType.object, PropType.null]),
  }),
  register: PropType.func.isRequired,
  login: PropType.func.isRequired,
  navigation: PropType.object,
};

const {colors, sizes} = SPS.variables;
const styles = {
  ctaTextStyle: {
    fontSize: sizes.font_M,
    textAlign: 'center',
    color: colors.textColorDim,
    marginVertical: sizes.gutter / 4,
  },
};

const mapStateToProps = (state) => {
  return {
    ...getAuth(state),
  };
};

export default withNavigation(
  connect(mapStateToProps, {register, login})(Profile)
);
