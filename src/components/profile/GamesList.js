import React, {Component} from 'react';
import PropType from 'prop-types';
import {View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {SceneContainer} from 'components/common';
import {Fade} from 'components/common';
import {LoadingIndicator} from 'components/common/LoadingIndicator';
import {getAuth} from 'reducers/AuthReducer';
import {auth, database} from 'assets';

import SPS from 'common/variables';
const {colors} = SPS.variables;

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
    database.ref('users/' + uid + '/playedGames').once('value').then(
      (snap) => {
        const gameKeys = snap.val();
        Promise.all(gameKeys.map((gameKey) => {
          const reference = `games/${gameKey}`;
          return database.ref(reference).once('value').then((snap) => snap.val());
        })).then((data) => {
          this.setState({
            loading: false,
            gameData: data,
          });
        });
      }
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
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          height: 50,
          backgroundColor: colors.grey.dark,
          borderBottomWidth: 1,
          borderColor: colors.text.dark,
        }}
      >
        <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'space-around'}}>
          <Text style={{color: colors.text.light}}>{`# ${index}`}</Text>
        </View>
        <View style={{flex: 4, alignItems: 'flex-start', justifyContent: 'space-around'}}>
          <Text style={{color: colors.text.light}}>{item.players[0].name}</Text>
        </View>
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'space-around'}}>
          <Text style={{color: colors.text.light}}>VS</Text>
        </View>
        <View style={{flex: 4, alignItems: 'flex-end', justifyContent: 'space-around'}}>
          <Text style={{color: colors.text.light}}>{item.players[1].name}</Text>
        </View>
      </View>
    );
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    return (
      <SceneContainer darkMode scrollable={false} pageTitle={'My games'}>
        <View
          style={{
            flex: 1,
            alignitems: 'stretch',
          }}
        >
          <Fade
            visible={this.state.loading}
            style={{position: 'relative', alignItems: 'center', justifyContent: 'space-around'}}
          >
            <LoadingIndicator size={'medium'} />
          </Fade>
          {this.state.gameData.length > 0 &&
            <FlatList
              data={this.state.gameData}
              disableVirtualization={false}
              renderItem={({item, index}) => GamesList.renderItem(item, index)}
              keyExtractor={(item) => `GamesList_${item.gameKey}`}
            />
          }
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

const mapStateToProps = (state) => {
  return {
    ...getAuth(state),
  };
};

export default withNavigation(connect(mapStateToProps, null)(GamesList));
