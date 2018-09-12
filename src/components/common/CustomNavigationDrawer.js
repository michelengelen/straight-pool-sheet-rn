import React, {PureComponent} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {connect} from 'react-redux';
import PropType from 'prop-types';

import {CustomNavigationItem} from 'components/common';

import SPS from 'common/variables';
import {filterDrawerItems} from 'common';

import {getAuth} from 'reducers/AuthReducer';
import {getAppState} from 'reducers/CommonReducer';
import * as gameSheetActions from 'actions/gameSheetActions';
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

    this.state = {
      filteredItems: [],
    };
  }

  /**
   * update the filteredItems inside the state
   *
   * @param {object} props
   * @param {object} state
   * @return {{filteredItems: *}}
   */
  static getDerivedStateFromProps(props, state) {
    const {authState, appState, items} = props;
    return {
      filteredItems: filterDrawerItems(items, authState.isLoggedIn, appState.gameRunning),
    };
  }

  cancelGame() {
    this.props.cancelGame(true).then(() => this.props.navigation.navigate('Home'));
  }

  /**
   * react render function
   * @return {jsx}
   */
  render() {
    const {navigation, appState} = this.props;
    const {wrapper, container, itemWrapper} = styles;
    return (
      <ScrollView style={wrapper}>
        <SafeAreaView style={container} forceInset={{top: 'always', horizontal: 'never'}}>
          <View style={itemWrapper}>
            {this.state.filteredItems.map((item) => {
              return (
                <CustomNavigationItem
                  key={item.key}
                  label={item.drawerTitle}
                  icon={item.iconName}
                  active={navigation.isFocused(item.key)}
                  navigate={() => navigation.navigate(item.key)}
                />
              );
            })}
            {appState.gameRunning &&
              <CustomNavigationItem
                label={'Cancel current game'}
                icon={'md-close'}
                active={false}
                backgroundColor={colors.useCase.error}
                navigate={() => this.cancelGame()}
              />
            }
          </View>
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
  appState: PropType.object,
  items: PropType.array,
  navigation: PropType.object,
  cancelGame: PropType.func,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.grey.darkest,
  },
  container: {
    flex: 1,
    paddingVertical: 55,
  },
  itemWrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.grey.mid,
  },
});


const mapStateToProps = (state) => {
  return {
    ...getAuth(state),
    ...getAppState(state),
  };
};


const mapDispatchToProps = (dispatch) => ({
  cancelGame: async (restart) =>
    await gameSheetActions.clearGameAction(dispatch, restart),
});

const connectedCustomNavigationDrawer = connect(mapStateToProps, mapDispatchToProps)(CustomNavigationDrawer);

export {connectedCustomNavigationDrawer as CustomNavigationDrawer};
