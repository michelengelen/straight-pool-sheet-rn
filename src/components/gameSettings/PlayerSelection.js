import React from 'react';
import {View, Text} from 'react-native';
import PropType from 'prop-types';
import {Avatar} from 'react-native-elements';
import SPS from 'common/variables';

/**
 * @param {object} props
 * @return {*}
 * @constructor
 */
const PlayerSelection = (props) => {
  const {
    wrapperStyle,
    playerNameContainer,
  } = styles;

  return (
    <View style={wrapperStyle}>
      <View style={playerNameContainer}>
        <View style={{transform: [{skewX: '-15deg'}], flex: 2, overflow: 'hidden', marginLeft: -10, aspectRatio: 1.3}}>
          <Avatar
            large
            containerStyle={{transform: [{skewX: '15deg'}, {scale: 1.3}]}}
            title={!props.user[0].avatar && props.user[0].username}
            source={props.user[0].avatar && {uri: props.user[0].avatar + '?type=large'}}
            /* eslint-disable-next-line */
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
        </View>
        <View style={{transform: [{skewX: '-15deg'}], flex: 3, overflow: 'hidden', marginLeft: -10}}>
          <Text style={{color: colors.textColor}}>{props.user[0] && props.user[0].username}</Text>
        </View>
        <Text style={{flex: 1}}>VS</Text>
        <Text style={{flex: 3}}>{props.user[1] && props.user[1].username}</Text>
        <View style={{transform: [{skewX: '15deg'}], flex: 2, overflow: 'hidden', marginRight: -10}}>
          <Avatar
            large
            containerStyle={{transform: [{skewX: '-15deg'}, {scale: 1.3}]}}
            title={!props.user[1].avatar && props.user[1].username || ''}
            source={props.user[1].avatar && {uri: props.user[1].avatar + '?type=medium'}}
            /* eslint-disable-next-line */
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
        </View>
      </View>
    </View>
  );
};

PlayerSelection.propTypes = {
  user: PropType.array,
};

const {colors} = SPS.variables;
const styles = {
  wrapperStyle: {
  },
  playerNameContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    maxHeight: 80,
    backgroundColor: colors.grey.light,
  },
  playerOneAvatarStyles: {

  },
};

export {PlayerSelection};
