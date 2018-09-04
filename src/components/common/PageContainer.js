import React from 'react';
import {View, ScrollView} from 'react-native';
import {Header} from 'react-native-elements';
import PropType from 'prop-types';

import SPS from 'common/variables';

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
  const {home = false, pageTitle} = props;
  const {viewStyle, headerStyle} = styles;

  return (
    <View style={{flex: 1}}>
      <Header
        leftComponent={!home ? {icon: 'arrow-back', color: colors.textColor} : {}}
        centerComponent={{text: pageTitle.toUpperCase(), style: {color: colors.textColor}}}
        rightComponent={{icon: 'menu', color: colors.textColor}}
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

export {PageContainer};
