import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropType from 'prop-types';
import {View, Text} from 'react-native';

import {
  CustomButton,
  PageIntro,
} from 'Components/common';
import {getSettings} from 'Reducers/GameSettingReducer';
import {getGameState} from '../reducers/GameSheetReducer';
import SPS from 'Common/variables';

/**
 * Gamesettings Component
 * This serves as a wrapper component for several inputs
 * which ultimately set the rules for the game to be played
 */
class FullscreenModal extends Component {
  /**
   * React render function
   * @return {*}
   */
  render() {
    const {
      gameSettings,
      gameSheet,
    } = this.props;

    const {
      wrapperViewStyle,
      modalViewStyle,
      modalTextStyle,
      modalBoldTextStyle,
      buttonContainerViewStyle,
    } = styles;

    const {players} = gameSettings;
    const {winner} = gameSheet;

    return (
      <View style={wrapperViewStyle}>
        <View style={modalViewStyle}>
          <PageIntro
            headerText={'Game over'}
            alignHeadline={'center'}
          />
          <Text style={modalTextStyle}>
            {'The winner of this game is '}
            <Text style={modalBoldTextStyle}>
              {players[winner].name}
            </Text>
            {' with a score of '}
            <Text style={modalBoldTextStyle}>
              {players[winner].totalScore}
            </Text>
          </Text>
          <View style={buttonContainerViewStyle}>
            <CustomButton
              buttonText={'New Game'}
              loading={false}
              onPress={() => this.props.navigation.navigate('GameSettings')}
            />
            <CustomButton
              buttonText={'Back to Home'}
              loading={false}
              onPress={() => this.props.navigation.navigate('Home')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const {colors, sizes} = SPS.variables;
const styles = {
  wrapperViewStyle: {
    fley: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignitems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: colors.backgroundColors.darkerGrey,
  },
  modalViewStyle: {
    flex: 1,
    maxWidth: '80%',
    maxHeight: '40%',
    padding: sizes.gutter,
  },
  modalTextStyle: {
    fontSize: sizes.font_L,
    color: colors.textColorDim,
  },
  modalBoldTextStyle: {
    fontWeight: 'bold',
    color: colors.textColor,
  },
  buttonContainerViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: sizes.gutter / 2,
  },
};

FullscreenModal.propTypes = {
  gameSettings: PropType.object,
  gameSheet: PropType.object,
  navigation: PropType.object,
};

const mapStateToProps = (state) => {
  return {
    ...getSettings(state),
    ...getGameState(state),
  };
};

export default connect(mapStateToProps, undefined)(FullscreenModal);
