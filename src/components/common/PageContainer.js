import React from 'react';
import {View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Header} from 'react-native-elements';
import PropType from 'prop-types';
import {withNavigation} from 'react-navigation';

import {getAppState} from 'reducers/CommonReducer';
import SPS from 'common/variables';
import {sceneNames} from 'common';
import {LoadingIndicator} from './LoadingIndicator';

const ConditionalView = (props) => {
  const {scrollable, style, ...other} = props;

  if (scrollable) {
    const {alignItems} = style;
    delete style.alignItems;

    return (
      <ScrollView
        contenContainerStyle={{alignItems}}
        style={style}
        {...other}
      >
        {props.children}
      </ScrollView>
    );
  }

  return (
    <View style={style} {...other}>
      {props.children}
    </View>
  );
};

ConditionalView.propTypes = {
  children: PropType.node,
  style: PropType.object,
  scrollable: PropType.bool.isRequired,
};

const PageContainer = (props) => {
  const {home = false, appState} = props;
  const {viewStyle, headerStyle} = styles;

  return (
    <View style={{flex: 1}}>
      <LoadingIndicator size={'full-size'} visible={appState.loading} />
      <Header
        leftComponent={
          !home
            ? {
              icon: 'arrow-back',
              color: colors.textColor,
              underlayColor: 'transparent',
              onPress: () => props.navigation.goBack(),
            }
            : {}
        }
        centerComponent={{
          text: sceneNames[props.navigation.state.routeName].toUpperCase(),
          style: {color: colors.textColor},
        }}
        rightComponent={{
          icon: 'menu',
          color: colors.textColor,
          onPress: () => {
            props.navigation.toggleDrawer();
          },
        }}
        outerContainerStyles={headerStyle.outer}
      />
      <ConditionalView
        style={{...viewStyle, ...props.style}}
        scrollable={props.scrollable}
      >
        {props.children}
      </ConditionalView>
    </View>
  );
};

PageContainer.propTypes = {
  children: PropType.node,
  style: PropType.object,
  home: PropType.bool,
  appState: PropType.object,
  navigation: PropType.object,
  pageTitle: PropType.string.isRequired,
  scrollable: PropType.bool.isRequired,
};

const {colors} = SPS.variables;
const styles = {
  viewStyle: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.grey.darkest,
  },
  headerStyle: {
    inner: {},
    outer: {
      backgroundColor: colors.grey.dark,
      borderBottomColor: colors.primary.full,
      height: 55,
    },
  },
};

const mapStateToProps = (state) => {
  return {
    ...getAppState(state),
  };
};

const PageContainerWithNav = connect(mapStateToProps, null)(
  withNavigation(PageContainer)
);
export {PageContainerWithNav as PageContainer};
