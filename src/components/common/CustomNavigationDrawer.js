import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {connect} from 'react-redux';
import PropType from 'prop-types';

import {CustomNavigationItem} from 'components/common';

import SPS from 'common/variables';
import {sceneNames} from 'common';

import {getAuth} from 'reducers/AuthReducer';
const {colors} = SPS.variables;

/**
 * class for rendering the navigation drawer
 * it gets taken in by the DrawerNavigatorConfig property in App.js
 */
class CustomNavigationDrawer extends PureComponent {
  /**
   * react constructor call
   * @param {object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * react render function
   * @return {jsx}
   */
  render() {
    const {items} = this.props;

    return (
      <ScrollView style={styles.wrapper}>
        <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

CustomNavigationDrawer.displayName = 'Custom Navigation Drawer';
CustomNavigationDrawer.propTypes = {
  authState: PropType.shape({
    isLoggedIn: PropType.bool.isRequired,
    user: PropType.object,
  }),
  navigation: PropType.object,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.grey.darkest,
  },
  container: {
    flex: 1,
  },
  // DrawerStyles
  labelStyle: {
    color: colors.text.mid,
  },
});


const mapStateToProps = (state) => {
  return {
    ...getAuth(state),
  };
};

const connectedCustomNavigationDrawer = connect(mapStateToProps, null)(CustomNavigationDrawer);

export {connectedCustomNavigationDrawer as CustomNavigationDrawer};
