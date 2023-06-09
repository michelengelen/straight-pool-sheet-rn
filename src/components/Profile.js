import React, {Component} from 'react';
import PropType from 'prop-types';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {CustomButton, SceneContainer} from 'components/common';
import {getAuth} from 'reducers/AuthReducer';

import SPS from 'common/variables';
const {colors, sizes} = SPS.variables;

import {authActions} from 'actions';

/**
 * Profile component
 * renders all information regarding the currently logged in user
 */
class Profile extends Component {
  /**
   * react constructor call
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.onSignOut = this.onSignOut.bind(this);
  }

  /**
   * handle the signOut of the current user
   */
  onSignOut() {
    this.props.signOut();
    this.props.navigation.navigate('Home');
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {user} = this.props.authState;
    return (
      <SceneContainer darkMode scrollable={false}>
        {user &&
          <View
            style={{
              flex: 1,
              alignitems: 'stretch',
            }}
          >
            <View style={{alignItems: 'center', paddingVertical: sizes.gutter}}>
              <Avatar
                xlarge
                rounded
                avatarStyle={{transform: [{scale: .91}]}}
                containerStyle={{borderWidth: 3, borderColor: colors.primary.full}}
                source={{uri: user ? user.avatar + '?type=large' : null}}
                /* eslint-disable-next-line */
                  onPress={() => console.log('Works!')}
                activeOpacity={0.7}
              />
            </View>
            <View style={{alignItems: 'center', marginBottom: 30}}>
              <Text style={{color: 'white'}}>{user.username || user.fullname}</Text>
            </View>
            <CustomButton
              iconLeft={'md-trophy'}
              buttonText={'Games played'}
              loading={false}
              onPress={() => this.props.navigation.navigate('GamesList')}
            />
            <CustomButton
              iconLeft={'md-stats'}
              buttonText={'Statistics (coming soon)'}
              loading={false}
              onPress={() => this.props.navigation.navigate('Statistics')}
            />
            <CustomButton
              style={{backgroundColor: colors.useCase.error}}
              iconLeft={'md-power'}
              buttonText={'Log out'}
              loading={false}
              onPress={this.onSignOut}
            />
          </View>
        }
      </SceneContainer>
    );
  }
}

Profile.propTypes = {
  authState: PropType.shape({
    isLoggedIn: PropType.bool,
    user: PropType.object,
  }),
  navigation: PropType.object,
  signOut: PropType.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    ...getAuth(state),
  };
};

const {signOut} = authActions;
export default withNavigation(connect(mapStateToProps, {signOut})(Profile));
