import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import PropType from 'prop-types';

import {
  CustomInput,
  CustomSlider,
  CustomButton,
  PageContainer,
  InputContainer,
} from 'components/common';
import {
  gameSettingActions,
  gameSheetActions,
} from 'actions';
import {getSettings} from 'reducers/GameSettingReducer';
import {getAuth} from 'reducers/AuthReducer';

import SPS from 'common/variables';
import {CustomSwitch} from './common/CustomSwitch';
import {authActions} from 'actions';

// global destructuring
const {colors, sizes} = SPS.variables;

/**
 * Gamesettings Component
 * This serves as a wrapper component for several inputs
 * which ultimately set the rules for the game to be played
 */
class GameSettings extends PureComponent {
  /**
   * react constructor call
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.useLoggedInUser = this.useLoggedInUser.bind(this);
    this.renderPlayerInput = this.renderPlayerInput.bind(this);

    const {isLoggedIn, useAccount, user} = props.authState;
    if (isLoggedIn && useAccount) {
      props.updatePlayer({
        index: 0,
        name: user.username,
        avatar: user.avatar,
        useAccount: true,
      });
    }
  }

  /**
   * callback for the switch when user wants to play as logged in user
   */
  useLoggedInUser() {
    const {players} = this.props.gameSettings;
    const {useAccount, user} = this.props.authState;

    let useAccountIndex = 0;
    for (let i = 0; i < 2; i++) {
      if (players[i].useAccount) useAccountIndex = i;
    }

    this.props.useAccount();

    this.props.updatePlayer({
      index: useAccountIndex,
      name: !useAccount ? user.username : '',
      avatar: !useAccount ? user.avatar : null,
      useAccount: !useAccount,
    });
  }

  /**
   * Asynchronous Action for starting a new Game
   * Is needed for setting the game-params before loading the
   * GameSheet Component
   *
   * @param  {object} gameSettings
   * @return {Promise<void>}
   */
  async startNewGame(gameSettings) {
    await this.props.startGame(gameSettings);
  }

  /**
   * renders the playerSelection for gameSettings
   *
   * @param  {object} player
   * @param  {number} index
   * @return {jsx}
   */
  renderPlayerInput(player, index) {
    const {name, useAccount} = player;
    const {updatePlayer} = this.props;
    const id = index === 0 ? 'One' : 'Two';

    return (
      <CustomInput
        key={`playerInput_${index}`}
        id={`player${id}`}
        label={`Player ${index + 1}`}
        value={name}
        style={{textAlign: 'center'}}
        onChangeText={(name) =>
          updatePlayer({
            index: index,
            name: name,
            useAccount: false,
          })
        }
        disabled={useAccount}
        placeholder={`Player ${id}`}
        secureTextEntry={false}
      />
    );
  }

  /**
   * renders the Avatar for the playerSelection
   *
   * @param  {string} avatar
   * @param  {string} title
   * @return {jsx}
   */
  renderAvatar(avatar, title) {
    let initials;
    if (title && typeof title === 'string') {
      const parts = title.split(' ');
      initials = parts[0] && parts[0][0];
      if (parts[1]) initials += parts[1][0];
      initials = initials.toUpperCase();
    }

    return (
      <Avatar
        large
        rounded
        avatarStyle={{transform: [{scale: .91}]}}
        containerStyle={{borderWidth: 3, borderColor: colors.useCase.error}}
        source={avatar ? {uri: avatar + '?type=large'} : null}
        title={title ? initials : null}
        /* eslint-disable-next-line */
        onPress={() => console.log('Works!')}
        activeOpacity={0.7}
      />
    );
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {
      authState,
      gameSettings,
      updatePoints,
      updateRounds,
      swapPlayers,
      navigation,
    } = this.props;

    const vsStyle = {
      color: colors.text.mid,
      fontSize: sizes.font_L,
      fontWeight: 'bold',
    };

    const {useAccount, isLoggedIn} = authState;
    const {players} = gameSettings;

    return (
      <View style={{flex: 1}}>
        <PageContainer darkMode scrollable pageTitle={'Gamesettings'}>
          <InputContainer headline={'Players'}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch'}}>
              <View style={{flex: 5, alignItems: 'center', paddingBottom: 10}}>
                {this.renderAvatar(players[0].avatar, players[0].name)}
              </View>
              <View style={{flex: 2, alignItems: 'center', justifyContent: 'space-around'}}>
                <Text style={vsStyle}>VS</Text>
              </View>
              <View style={{flex: 5, alignItems: 'center', paddingBottom: 10}}>
                {this.renderAvatar(players[1].avatar, players[1].name)}
              </View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch'}}>
              <View style={{flex: 5}}>
                {this.renderPlayerInput(players[0], 0)}
              </View>
              <View style={{flex: 2, alignItems: 'center', justifyContent: 'space-around'}}>
                <Icon
                  name={'md-swap'}
                  type={'ionicon'}
                  underlayColor={'transparent'}
                  color={colors.text.mid}
                  onPress={swapPlayers}
                />
              </View>
              <View style={{flex: 5}}>
                {this.renderPlayerInput(players[1], 1)}
              </View>
            </View>
          </InputContainer>
          {isLoggedIn &&
            <CustomSwitch
              value={isLoggedIn && useAccount}
              label={'SwitchTest'}
              switchWidth={58}
              onChange={this.useLoggedInUser}
            />
          }
          <CustomSlider
            label={'Maximum Points'}
            value={gameSettings.maxPoints}
            minimumValue={50}
            maximumValue={200}
            onSlidingComplete={(value) => updatePoints(value)}
          />
          <CustomSlider
            label={'Maximum Rounds'}
            value={gameSettings.maxRounds}
            minimumValue={15}
            maximumValue={50}
            onSlidingComplete={(value) => updateRounds(value)}
          />
          <CustomButton
            style={{marginTop: sizes.gutter / 2}}
            buttonText={'Start Game'}
            disabled={
              !players[0].name || !players[1].name
            }
            loading={false}
            onPress={() => {
              this.startNewGame(gameSettings)
                .then(function() {
                  navigation.navigate('GameSheet');
                });
            }}
          />
        </PageContainer>
      </View>
    );
  }
}

GameSettings.propTypes = {
  authState: PropType.object,
  gameSettings: PropType.object,
  updatePlayer: PropType.func,
  updatePoints: PropType.func,
  updateRounds: PropType.func,
  startGame: PropType.func,
  useAccount: PropType.func,
  swapPlayers: PropType.func,
  navigation: PropType.object,
};

const mapStateToProps = (state) => {
  return {
    ...getSettings(state),
    ...getAuth(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updatePlayer: (playerData) =>
    gameSettingActions.updatePlayerAction(dispatch, playerData),
  updatePoints: (maxPoints) =>
    gameSettingActions.updatePointsAction(dispatch, maxPoints),
  updateRounds: (maxRounds) =>
    gameSettingActions.updateRoundsAction(dispatch, maxRounds),
  swapPlayers: () =>
    gameSettingActions.swapPlayersAction(dispatch),
  startGame: (settings) =>
    gameSheetActions.startGameAction(dispatch, settings),
  useAccount: (user) =>
    authActions.useAccount(dispatch, user),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSettings);
