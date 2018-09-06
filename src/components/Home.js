import React, {Component} from 'react';
import PropType from 'prop-types';
import {connect} from 'react-redux';
import Image from 'react-native-remote-svg';

import {PageContainer, CustomButton} from 'components/common';

import Images from 'assets/images';
import SPS from 'common/variables';
import {getAuth} from '../reducers/AuthReducer';

import {authActions} from 'actions';

/**
 * Home Component
 * The starting point for the App with Login/Register/View-Profile Buttons depending on the login-state
 */
class Home extends Component {
  /**
   * react constructor call
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.onSignOut = this.onSignOut.bind(this);
  }

  /**
   * React lifecycle hook - componentDidMount
   */
  componentDidMount() {
    this.props.checkLoginStatus();
  }

  /**
   * handle the signOut of the current user
   */
  onSignOut() {
    this.props.signOut();
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {imageStyle} = styles;
    const {isLoggedIn} = this.props.authState;

    return (
      <PageContainer
        home
        darkMode
        pageTitle={'STRAIGHT POOL SHEET'}
        scrollable={false}
        style={{alignItems: 'stretch', justifyContent: 'center'}}
      >
        <Image source={Images.logo} style={imageStyle} />
        <CustomButton
          buttonText={'Start New Game'}
          loading={false}
          onPress={() => this.props.navigation.navigate('GameSettings')}
        />
        <CustomButton
          buttonText={isLoggedIn ? 'View Profile' : 'Login / Register'}
          loading={false}
          onPress={() => this.props.navigation.navigate('Profile')}
        />
        {isLoggedIn && (
          <CustomButton
            buttonText={'Log out'}
            loading={false}
            onPress={this.onSignOut}
          />
        )}
      </PageContainer>
    );
  }
}

Home.propTypes = {
  navigation: PropType.object,
  authState: PropType.object,
  signOut: PropType.func.isRequired,
  checkLoginStatus: PropType.func.isRequired,
};

const {sizes} = SPS.variables;
const {dimensions} = sizes;

const styles = {
  imageStyle: {
    marginBottom: sizes.gutter,
    width: dimensions.width - sizes.gutter,
    height: 120,
    padding: sizes.gutter / 2,
  },
};

const mapStateToProps = (state) => {
  return {
    ...getAuth(state),
  };
};

const {checkLoginStatus, signOut} = authActions;
export default connect(mapStateToProps, {checkLoginStatus, signOut})(Home);
