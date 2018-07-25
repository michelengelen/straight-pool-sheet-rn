import React, {Component} from 'react';
import PropType from 'prop-types';
import {connect} from 'react-redux';
import {Text} from 'react-native';

import {PageContainer, CustomButton} from 'Components/common';

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
    return (
      <PageContainer
        darkMode={true}
        scrollable={false}
        style={{alignItems: 'center', justifyContent: 'center'}}
      >
        <Text>Straight Pool Sheet</Text>
        <CustomButton
          title="New Game"
          onPress={() => this.props.navigation.navigate('GameSettings')}
        />
      </PageContainer>
    );
  }
}

Home.propTypes = {
  navigation: PropType.object,
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
