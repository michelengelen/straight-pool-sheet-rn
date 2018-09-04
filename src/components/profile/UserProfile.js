import React, {Component} from 'react';
import PropType from 'prop-types';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {PageContainer} from 'Components/common';
import {getAuth} from 'Reducers/AuthReducer';

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {user} = this.props.authState;
    return (
      <PageContainer
        darkMode
        scrollable={false}
        pageTitle={'Profile Page'}
      >
        <Text style={{color: 'white'}}>{`Hello ${user.username}`}</Text>
      </PageContainer>
    );
  }
}

UserProfile.propTypes = {
  authState: PropType.shape({
    isLoggedIn: PropType.bool.isRequired,
    user: PropType.oneOf([
      PropType.object,
      PropType.null,
    ]),
  }),
  navigation: PropType.object,
};

const mapStateToProps = (state) => {
  return {
    ...getAuth(state),
  };
};

export default withNavigation(connect(mapStateToProps, null)(UserProfile));
