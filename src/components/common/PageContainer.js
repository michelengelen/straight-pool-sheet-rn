import React from 'react';
import {View, ScrollView} from 'react-native';
import {Header} from 'react-native-elements';
import PropType from 'prop-types';
import {withNavigation} from 'react-navigation';

import SPS from 'common/variables';
import {sceneNames} from 'common';

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
  const {home = false, navigation} = props;
  const {viewStyle, headerStyle} = styles;
  const {routeName} = navigation.state;

  return (
    <View style={{flex: 1}}>
      <Header
        leftComponent={
          !home
            ? {
              icon: 'arrow-back',
              color: colors.textColor,
              underlayColor: 'transparent',
              onPress: () => navigation.goBack(),
            }
            : {}
        }
        centerComponent={{
          text: sceneNames[routeName].sceneName.toUpperCase(),
          style: {color: colors.textColor},
        }}
        rightComponent={{
          icon: 'menu',
          color: colors.textColor,
          onPress: () => {
            navigation.toggleDrawer();
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

const PageContainerWithNav = withNavigation(PageContainer);
export {PageContainerWithNav as PageContainer};
