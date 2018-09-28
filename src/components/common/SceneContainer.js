import React from 'react';
import {View, ScrollView} from 'react-native';
import {Header} from 'react-native-elements';
import PropType from 'prop-types';
import {withNavigation} from 'react-navigation';

import SPS from 'common/variables';
const {colors, sizes} = SPS.variables;
import {scenes} from 'common';

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

const SceneContainer = (props) => {
  const {home = false, navigation} = props;
  const {viewStyle, headerStyle} = styles;
  const {routeName} = navigation.state;

  return (
    <View style={{flex: 1}}>
      <Header
        leftComponent={
          (home || routeName === 'GameSheet')
            ? {}
            : {
              icon: 'arrow-back',
              color: colors.textColor,
              underlayColor: 'transparent',
              onPress: () => navigation.goBack(),
            }
        }
        centerComponent={{
          text: scenes[routeName].sceneName.toUpperCase(),
          style: {color: colors.textColor, fontSize: sizes.font_XL},
        }}
        rightComponent={{
          icon: 'menu',
          color: colors.textColor,
          underlayColor: 'transparent',
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

SceneContainer.propTypes = {
  children: PropType.node,
  style: PropType.object,
  home: PropType.bool,
  navigation: PropType.object,
  scrollable: PropType.bool.isRequired,
};

const styles = {
  viewStyle: {
    flex: 1,
    backgroundColor: colors.grey.darkest,
  },
  headerStyle: {
    inner: {},
    outer: {
      backgroundColor: colors.grey.dark,
      borderBottomColor: colors.primary.full,
      height: 55,
      zIndex: 100,
    },
  },
};

const SceneContainerWithNav = withNavigation(SceneContainer);
export {SceneContainerWithNav as SceneContainer};
