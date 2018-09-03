import React, {Component} from 'react';
import PropType from 'prop-types';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';

import {authActions} from 'actions';
import {LoginForm, RegisterForm} from 'Components/common';
import UserProfile from 'Components/profile/UserProfile';

import {getAuth} from 'Reducers/AuthReducer';

import {withNavigation} from 'react-navigation';

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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: error,
      register: true,
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
    if (this.props.authState.isLoggedIn) {
      return <UserProfile user={this.props.authState.user} />;
    }

    if (this.state.register) {
      return (
        <View style={{flex: 1}}>
          <RegisterForm
            fields={fields.register}
            showLabel={false}
            onSubmit={this.onSubmit}
            buttonTitle={'SIGN UP'}
            error={this.state.error.register}
          />
          <Text>{'Already have an account?'}</Text>
          <Button
            title={'Login to your account'}
            onPress={() => this.setState({register: !register})}
          />
          <Text>.</Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <LoginForm
          fields={fields.login}
          showLabel={false}
          onSubmit={this.onSubmit}
          buttonTitle={'SIGN IN'}
          error={this.state.error.login}
        />
        <Text>{'New to the App? '}</Text>
        <Button
          title={'Create account'}
          onPress={() => this.setState({register: !register})}
        />
        <Text>.</Text>
      </View>
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

const mapStateToProps = (state) => {
  return {
    ...getAuth(state),
  };
};

export default withNavigation(
  connect(mapStateToProps, {register, login})(Profile)
);
