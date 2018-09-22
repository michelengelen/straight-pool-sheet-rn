import React, {Component} from 'react';
import PropType from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {Icon} from 'react-native-elements';

import {SceneContainer} from 'components/common';
import {Fade} from 'components/common';
import {LoadingIndicator} from 'components/common/LoadingIndicator';
import {getAuth} from 'reducers/AuthReducer';
import {auth, database} from 'assets';
import {getFullDate, getTimePlayed} from 'helpers';

import {Avatar} from 'react-native-elements';
import {i18n} from 'assets';
import SPS from 'common/variables';
const {colors, sizes} = SPS.variables;

/**
 * GamesList component
 * renders all information regarding the currently logged in user
 */
class GamesList extends Component {
  /**
   * react constructor call
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      gameData: [],
    };

    const uid = auth.currentUser.uid;
    database
      .ref('users/' + uid + '/playedGames')
      .once('value')
      .then((snap) => {
        const gameKeys = snap.val();
        Promise.all(
          gameKeys.filter((x) => x).map((gameKey) => {
            if (!gameKey) return;
            const reference = `games/${gameKey}`;
            return database
              .ref(reference)
              .once('value')
              .then((snap) => snap.val());
          })
        ).then((data) => {
          this.setState({
            loading: false,
            gameData: data.reverse(),
          });
        });
      });
  }

  /**
   * renders the Avatar for the playerSelection
   *
   * @param  {string} avatar
   * @param  {string} title
   * @param  {number} index
   * @return {jsx}
   */
  static renderAvatar(avatar, title, index) {
    let initials;
    if (title && typeof title === 'string') {
      const parts = title.split(' ');
      initials = parts[0] && parts[0][0];
      if (parts[1]) initials += parts[1][0];
      initials = initials.toUpperCase();
    }

    const playerColor = colors.useCase[`player${index + 1}`];

    return (
      <Avatar
        medium
        avatarStyle={{transform: [{scale: 0.83}], borderRadius: 6}}
        containerStyle={{
          borderWidth: 2,
          borderColor: playerColor,
          borderRadius: 8,
        }}
        source={avatar ? {uri: avatar + '?type=large'} : null}
        title={title ? initials : null}
        /* eslint-disable-next-line */
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />
    );
  }

  /**
   * renders a single statusView
   * @param   {string} label
   * @param   {string} text
   * @param   {string} [type]
   * @param   {string} [icon]
   * @return  {jsx}
   */
  static renderStatus(label, text, type, icon) {
    const {statusContainerStyle, statusLabelStyle, statusTextStyle} = styles;
    const iconColor = colors.useCase[type] || colors.primary.full;

    return (
      <View style={statusContainerStyle}>
        <Text style={statusLabelStyle}>{label.toUpperCase()}</Text>
        <View style={{flexDirection: 'row'}}>
          <Icon
            type={'ionicon'}
            name={icon || 'md-information-circle-outline'}
            size={sizes.font_S}
            color={iconColor}
          />
          <Text style={statusTextStyle}>{text}</Text>
        </View>
      </View>
    );
  }

  /**
   * renders an item in the GamesList
   *
   * @param   {object} item
   * @param   {number} index
   * @return  {jsx}
   */
  static renderItem(item, index) {
    const {
      itemWrapper,
      resultWrapper,
      resultViewStyle,
      avatarViewStyle,
      winnerTextStyle,
      looserTextStyle,
      winnerPointStyle,
      looserPointStyle,
      statusViewStyle,
    } = styles;

    const {players, gameState, maxPoints, maxRounds} = item;
    const {winner, startTime, finishTime} = gameState;

    // const playedTimeString =
    finishTime ? getTimePlayed(startTime, finishTime) : getFullDate(startTime);

    return (
      <View style={itemWrapper}>
        <View style={resultWrapper}>
          <View style={{...avatarViewStyle, alignItems: 'flex-start'}}>
            {GamesList.renderAvatar(
              players[0].avatar ? players[0].avatar : null,
              players[0].name || players[0].firstname,
              0
            )}
          </View>
          <View style={{flex: 6}}>
            <View style={resultViewStyle}>
              <View
                style={{
                  flex: 4,
                  alignItems: 'flex-end',
                  justifyContent: 'space-around',
                }}
              >
                <Text style={winner === 0 ? winnerTextStyle : looserTextStyle}>
                  {item.players[0].name}
                </Text>
              </View>
              <View
                style={{
                  flex: 2,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <Text style={{color: colors.text.light}}>vs</Text>
              </View>
              <View
                style={{
                  flex: 4,
                  alignItems: 'flex-start',
                  justifyContent: 'space-around',
                }}
              >
                <Text style={winner === 1 ? winnerTextStyle : looserTextStyle}>
                  {item.players[1].name}
                </Text>
              </View>
            </View>
            <View
              style={{
                ...resultViewStyle,
                borderTopWidth: 1,
                borderColor: colors.text.dark,
              }}
            >
              <View
                style={{
                  flex: 4,
                  alignItems: 'flex-end',
                  justifyContent: 'space-around',
                }}
              >
                <Text
                  style={winner === 0 ? winnerPointStyle : looserPointStyle}
                >
                  {item.players[0].totalScore}
                </Text>
              </View>
              <View
                style={{
                  flex: 2,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <Text style={{color: colors.text.light}}>:</Text>
              </View>
              <View
                style={{
                  flex: 4,
                  alignItems: 'flex-start',
                  justifyContent: 'space-around',
                }}
              >
                <Text
                  style={winner === 1 ? winnerPointStyle : looserPointStyle}
                >
                  {item.players[1].totalScore}
                </Text>
              </View>
            </View>
          </View>
          <View style={{...avatarViewStyle, alignItems: 'flex-end'}}>
            {GamesList.renderAvatar(
              players[1].avatar ? players[1].avatar : null,
              players[1].name || players[1].firstname,
              1
            )}
          </View>
        </View>
        <View style={statusViewStyle}>
          {gameState.cancelled &&
            this.renderStatus(
              i18n.t('labels.gameStatus'),
              i18n.t('messages.gameCancelled'),
              'error',
              'md-close-circle-outline'
            )}
          {gameState.finished &&
            !gameState.cancelled &&
            this.renderStatus(
              i18n.t('labels.gameStatus'),
              i18n.t('messages.gameFinished'),
              'success',
              'md-checkmark-circle-outline'
            )}
          {!gameState.finished &&
            !gameState.cancelled &&
            this.renderStatus(
              i18n.t('labels.gameStatus'),
              i18n.t('messages.gameRunning'),
              'warning',
              'md-timer'
            )}
          {this.renderStatus(
            i18n.t('labels.maxPoints'),
            `${maxPoints} ${i18n.t('labels.points')}`
          )}
          {this.renderStatus(
            i18n.t('labels.maxRounds'),
            `${maxRounds} ${i18n.t('labels.rounds')}`
          )}
        </View>
      </View>
    );
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {gameData, loading} = this.state;
    return (
      <SceneContainer darkMode scrollable={false}>
        <View
          style={{
            flex: 1,
            paddingTop: sizes.gutter * 0.5,
            alignitems: 'stretch',
          }}
        >
          <Fade
            visible={loading}
            style={{
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <LoadingIndicator size={'medium'} />
          </Fade>
          {gameData.length > 0 && (
            <FlatList
              data={gameData}
              disableVirtualization={false}
              renderItem={({item, index}) =>
                GamesList.renderItem(item, index)
              }
              keyExtractor={(item) => `GamesList_${item.gameKey}`}
            />
          )}
        </View>
      </SceneContainer>
    );
  }
}

GamesList.propTypes = {
  authState: PropType.shape({
    isLoggedIn: PropType.bool.isRequired,
    user: PropType.object.isRequired,
  }),
  navigation: PropType.object,
};

const styles = StyleSheet.create({
  itemWrapper: {
    backgroundColor: colors.grey.dark,
    borderColor: colors.text.dark,
    borderRadius: 10,
    marginHorizontal: sizes.gutter * 0.5,
    marginVertical: sizes.gutter * 0.25,
    paddingHorizontal: sizes.gutter * 0.5,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    elevation: 4,
  },
  resultWrapper: {
    flexDirection: 'row',
    paddingVertical: sizes.gutter * 0.5,
  },
  avatarViewStyle: {
    flex: 2,
  },
  resultViewStyle: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  winnerTextStyle: {
    fontSize: sizes.font_M,
    fontWeight: 'bold',
    color: colors.text.light,
    padding: 2,
  },
  looserTextStyle: {
    fontSize: sizes.font_M,
    fontWeight: 'bold',
    color: colors.text.mid,
    padding: 2,
  },
  winnerPointStyle: {
    fontSize: sizes.font_XL,
    color: colors.primary.full,
    padding: 2,
  },
  looserPointStyle: {
    fontSize: sizes.font_XL,
    color: colors.text.mid,
    padding: 2,
  },
  statusViewStyle: {
    borderTopWidth: 1,
    borderColor: colors.text.dark,
    flexDirection: 'row',
  },
  statusContainerStyle: {
    flex: 1,
    paddingVertical: sizes.gutter * 0.5,
  },
  statusLabelStyle: {
    fontSize: sizes.font_S,
    color: colors.text.dark,
  },
  statusTextStyle: {
    fontSize: sizes.font_M,
    color: colors.text.light,
    paddingLeft: sizes.gutter * 0.25,
  },
});

const mapStateToProps = (state) => {
  return {
    ...getAuth(state),
  };
};

export default withNavigation(connect(mapStateToProps, null)(GamesList));
