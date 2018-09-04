import React, {Component} from 'react';
import PropType from 'prop-types';
import {connect} from 'react-redux';
import Image from 'react-native-remote-svg';

import {PageContainer, CustomButton} from 'Components/common';

import Images from 'Assets/images';
import SPS from 'Common/variables';
import {getAuth} from '../reducers/AuthReducer';

/**
 * Gamesettings Component
 * This serves as a wrapper component for several inputs
 * which ultimately set the rules for the game to be played
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
      </PageContainer>
    );
  }
}

Home.propTypes = {
  navigation: PropType.object,
  authState: PropType.object,
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

export default connect(mapStateToProps, undefined)(Home);
