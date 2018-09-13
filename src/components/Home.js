import React, {Component} from 'react';
import PropType from 'prop-types';
import {connect} from 'react-redux';
// import Image from 'react-native-remote-svg';
import {Image} from 'react-native';
import {Icon} from 'react-native-elements';

import {PageContainer, CustomButton} from 'components/common';

import Images from 'assets/images';
import SPS from 'common/variables';
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

  static navigationOptions = {
    params: {
      test: true,
    },
  };

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
      <PageContainer
        home
        darkMode
        pageTitle={'STRAIGHT POOL SHEET'}
        scrollable={false}
        style={{alignItems: 'stretch', justifyContent: 'center'}}
      >
        <Image source={{uri: 'logo'}} style={imageStyle} />
        <CustomButton
          buttonText={gameRunning ? 'Return to your game' : 'Start New Game'}
          loading={false}
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
          onPress={() => {
            if (isLoggedIn) {
              this.props.navigation.navigate('Profile');
            } else {
              this.props.navigation.navigate('LoginRegister');
            }
          }}
        />
      </PageContainer>
    );
  }
}

Home.propTypes = {
  navigation: PropType.object,
  authState: PropType.object,
  tintColor: PropType.string,
  checkLoginStatus: PropType.func.isRequired,
};

Home.navigationOptions = {
  drawerLabel: 'Home',
  drawerIcon: ({tintColor}) => {
    return (
      <Icon type={'ionicon'} name={'md-home'} color={colors.primary.full} />
    );
  },
};

const {colors, sizes} = SPS.variables;
const {dimensions} = sizes;

const styles = {
  imageStyle: {
    width: '90%',
    height: 80,
    alignSelf: 'center',
    marginBottom: sizes.gutter,
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
