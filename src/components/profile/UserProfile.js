import React, {Component} from 'react';
import PropType from 'prop-types';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {PageContainer} from 'components/common';
import {getAuth} from 'reducers/AuthReducer';

import SPS from 'common/variables';

/**
 * UserProfile component
 * renders all information regarding the currently logged in user
 */
class UserProfile extends Component {
  /**
   * react constructor call
   * @param {object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * React render function
   * @return {*}
   */
  render() {
    const {user} = this.props.authState;
    return (
      <PageContainer darkMode scrollable={false} pageTitle={'Profile Page'}>
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
              style={{borderWidth: 3, borderColor: colors.primary.full}}
              source={{
                uri: user.avatar,
              }}
              /* eslint-disable-next-line */
              onPress={() => console.log('Works!')}
              activeOpacity={0.7}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white'}}>{user.username || user.fullname}</Text>
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

const {colors, sizes} = SPS.variables;

const mapStateToProps = (state) => {
  return {
    ...getAuth(state),
  };
};

export default withNavigation(connect(mapStateToProps, null)(UserProfile));
