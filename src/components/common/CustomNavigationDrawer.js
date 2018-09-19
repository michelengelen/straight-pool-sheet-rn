import React, {PureComponent} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {connect} from 'react-redux';
import PropType from 'prop-types';

import {CustomNavigationItem} from 'components/common';

import SPS from 'common/variables';
import {filterDrawerItems} from 'common';

import {getAuth} from 'reducers/AuthReducer';
import {isGameRunning} from 'reducers/GameSettingReducer';
import {gameSheetActions} from 'actions';
import {getGameSheet} from '../../reducers/GameSheetReducer';
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
    const {authState, gameRunning, items} = props;
    return {
      filteredItems: filterDrawerItems(items, authState.isLoggedIn, gameRunning),
    };
  }

  /**
   * handle cancel game button press
   *
   * @param {object} gameSheet
   */
  cancelGame(gameSheet) {
    this.props.cancelGame(gameSheet).then(() => {
      this.props.clearGame(false);
      this.props.navigation.navigate('Home');
      this.props.navigation.closeDrawer();
    });
  }

  /**
   * react render function
   * @return {jsx}
   */
  render() {
    const {navigation, gameRunning, gameSheet} = this.props;
    const {wrapper, container, itemWrapper} = styles;
    return (
      <ScrollView style={wrapper}>
        <SafeAreaView style={container} forceInset={{top: 'always', horizontal: 'never'}}>
          <View style={itemWrapper}>
            {this.state.filteredItems.map((item) => {
              return (
                <CustomNavigationItem
                  navigateButton
                  key={item.key}
                  label={item.drawerTitle}
                  icon={item.iconName}
                  active={navigation.isFocused(item.key)}
                  navigate={() => navigation.navigate(item.key)}
                />
              );
            })}
            {gameRunning &&
              <CustomNavigationItem
                label={'Cancel current game'}
                icon={'md-close'}
                active={false}
                backgroundColor={colors.useCase.error}
                navigate={() => this.cancelGame(gameSheet)}
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
  gameRunning: PropType.bool,
  gameSheet: PropType.object,
  items: PropType.array,
  navigation: PropType.object,
  cancelGame: PropType.func,
  clearGame: PropType.func,
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
    ...getGameSheet(state),
    ...isGameRunning(state),
  };
};


const mapDispatchToProps = (dispatch) => ({
  cancelGame: async (gameData) =>
    await gameSheetActions.cancelGameAction(dispatch, gameData),
  clearGame: () =>
    gameSheetActions.clearGameAction(dispatch, false),
});

const connectedCustomNavigationDrawer = connect(mapStateToProps, mapDispatchToProps)(CustomNavigationDrawer);

export {connectedCustomNavigationDrawer as CustomNavigationDrawer};
