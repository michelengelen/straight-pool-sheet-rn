import React, {Component} from 'react';
import PropType from 'prop-types';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {PageContainer} from 'components/common';
import {getAuth} from 'Reducers/AuthReducer';

import SPS from 'common/variables';

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {user} = this.props.authState;
    return (
      <PageContainer darkMode scrollable={false} pageTitle={'Profile Page'}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignitems: 'stretch',
            justifyContent: 'space-around',
          }}
        >
          <View style={{flex: 2}}>
            <Avatar
              large
              rounded
              style={{borderWidth: 3, borderColor: colors.primary.full}}
              source={{
                uri: user.photoURL,
              }}
              onPress={() => console.log('Works!')}
              activeOpacity={0.7}
            />
          </View>
          <View style={{flex: 5}}>
            <Text style={{color: 'white'}}>{`Hello ${user.username ||
              user.displayName}`}</Text>
          </View>
        </View>
      </PageContainer>
    );
  }
}

UserProfile.propTypes = {
  authState: PropType.shape({
    isLoggedIn: PropType.bool.isRequired,
    user: PropType.object.isRequired,
  }),
  navigation: PropType.object,
};

const {colors} = SPS.variables;

const mapStateToProps = (state) => {
  return {
    ...getAuth(state),
  };
};

export default withNavigation(connect(mapStateToProps, null)(UserProfile));
