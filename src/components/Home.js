import React, {Component} from 'react';
import {View} from 'react-native';
import PropType from 'prop-types';
import {connect} from 'react-redux';

import {
  PageContainer,
  CustomButton,
  PageIntro,
} from 'Components/common';

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
        <View>
          <PageIntro
            headerText={'Straight Pool Sheet'}
            alignHeadline={'center'}
          />
          <CustomButton
            buttonText="New Game"
            loading={false}
            onPress={() => this.props.navigation.navigate('GameSettings')}
          />
        </View>
      </PageContainer>
    );
  }
}

Home.propTypes = {
  navigation: PropType.object,
};

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default connect(undefined, undefined)(Home);
