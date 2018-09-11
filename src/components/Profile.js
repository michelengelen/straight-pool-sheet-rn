import React, {PureComponent} from 'react';
import PropType from 'prop-types';
import {connect} from 'react-redux';

import UserProfile from 'components/profile/UserProfile';

import {getAuth} from 'reducers/AuthReducer';

/**
 * Profile component which renders either a Login-/Register-Form or the UserProfile
 */
class Profile extends PureComponent {
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
    return (
      <UserProfile />
    );
  }
}

Profile.propTypes = {
  authState: PropType.object,
};

const mapStateToProps = (state) => {
  return {
    ...getAuth(state),
  };
};

export default connect(mapStateToProps, null)(Profile);
