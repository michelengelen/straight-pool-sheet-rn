import React, {Component} from 'react';
import {View} from 'react-native';
import PropType from 'prop-types';
import {connect} from 'react-redux';
import {Header} from 'react-native-elements';
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
    const {isLoggedIn, user} = this.props.authState;

    return (
      <View style={{flex: 1}}>
        <Header
          leftComponent={{icon: 'menu', color: '#fff'}}
          centerComponent={{text: 'HOME', style: {color: '#fff'}}}
          rightComponent={{icon: 'home', color: '#fff'}}
          outerContainerStyles={{
            backgroundColor: SPS.variables.colors.grey.dark,
            height: 55,
            borderBottomColor: SPS.variables.colors.primary.full,
          }}
        />
        <PageContainer
          darkMode={true}
          scrollable={false}
          style={{alignItems: 'stretch', justifyContent: 'center'}}
        >
          <Image source={Images.logo} style={imageStyle} />
          <CustomButton
            margin={{top: 20, bottom: 20}}
            buttonText={'Start New Game'}
            loading={false}
            onPress={() => this.props.navigation.navigate('GameSettings')}
          />
          <CustomButton
            margin={{top: 20, bottom: 20}}
            buttonText={isLoggedIn ? 'View Profile' : 'Login / Register'}
            loading={false}
            onPress={() => this.props.navigation.navigate('Profile')}
          />
        </PageContainer>
      </View>
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
