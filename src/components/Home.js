import React, {Component} from 'react';
import PropType from 'prop-types';
import {connect} from 'react-redux';
import Image from 'react-native-remote-svg';

import {
  PageContainer,
  CustomButton,
} from 'Components/common';

import Images from 'Assets/images';
import SPS from 'Common/variables';

/**
 * Gamesettings Component
 * This serves as a wrapper component for several inputs
 * which ultimately set the rules for the game to be played
 */
class Home extends Component {
  /**
   * React render function
   * @return {*}
   */
  render() {
    const {imageStyle} = styles;
    return (
      <PageContainer
        darkMode={true}
        scrollable={false}
        style={{alignItems: 'stretch', justifyContent: 'center'}}
      >
        <Image source={Images.logo} style={imageStyle} />
        <CustomButton
          margin={{top: 20, bottom: 20}}
          buttonText="Start New Game"
          loading={false}
          onPress={() => this.props.navigation.navigate('GameSettings')}
        />
        <CustomButton
          margin={{top: 20, bottom: 20}}
          buttonText="Login / Register"
          loading={false}
          onPress={() => this.props.navigation.navigate('Profile')}
        />
      </PageContainer>
    );
  }
}

Home.propTypes = {
  navigation: PropType.object,
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

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default connect(undefined, undefined)(Home);
