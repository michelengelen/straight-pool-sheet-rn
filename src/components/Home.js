import React, {Component} from 'react';
import PropType from 'prop-types';
import {connect} from 'react-redux';
import {Image} from 'react-native';

import {SceneContainer, CustomButton} from 'components/common';

import Images from 'assets/images';
import SPS from 'common/variables';
const {colors, sizes} = SPS.variables;

import {getAuth} from 'reducers/AuthReducer';

import {authActions} from 'actions';
import {isGameRunning} from 'reducers/GameSettingReducer';

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
  }

  /**
   * React lifecycle hook - componentDidMount
   */
  componentDidMount() {
    this.props.checkLoginStatus();
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {imageStyle} = styles;
    const {isLoggedIn} = this.props.authState;
    const {gameRunning} = this.props;

    return (
      <SceneContainer
        home
        darkMode
        pageTitle={'STRAIGHT POOL SHEET'}
        scrollable={false}
        style={{alignItems: 'stretch', justifyContent: 'center'}}
      >
        <Image source={Images.logo} style={imageStyle} />
        <CustomButton
          buttonText={gameRunning ? 'Return to your game' : 'Start New Game'}
          loading={false}
          iconLeft={gameRunning ? 'md-play' : 'md-add'}
          iconRight={'md-arrow-dropright'}
          onPress={() => {
            if (gameRunning) {
              this.props.navigation.navigate('GameSheet');
            } else {
              this.props.navigation.navigate('GameSettings');
            }
          }}
        />
        <CustomButton
          buttonText={isLoggedIn ? 'View Profile' : 'Login / Register'}
          loading={false}
          iconLeft={isLoggedIn ? 'md-person' : 'md-log-in'}
          iconRight={'md-arrow-dropright'}
          onPress={() => {
            if (isLoggedIn) {
              this.props.navigation.navigate('Profile');
            } else {
              this.props.navigation.navigate('LoginRegister');
            }
          }}
        />
      </SceneContainer>
    );
  }
}

Home.propTypes = {
  navigation: PropType.object,
  authState: PropType.object,
  tintColor: PropType.string,
  gameRunning: PropType.bool,
  checkLoginStatus: PropType.func.isRequired,
};

const styles = {
  imageStyle: {
    width: '90%',
    height: 80,
    alignSelf: 'center',
    marginBottom: sizes.gutter * 3,
    resizeMode: 'contain',
    padding: sizes.gutter / 2,
  },
};

const mapStateToProps = (state) => {
  return {
    ...getAuth(state),
    ...isGameRunning(state),
  };
};

const {checkLoginStatus} = authActions;
export default connect(mapStateToProps, {checkLoginStatus})(Home);
