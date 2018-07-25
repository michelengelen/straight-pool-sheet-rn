import React from 'react';
import {View, ScrollView} from 'react-native';
import PropType from 'prop-types';

import SPS from 'Common/variables';

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
  const {viewStyle} = styles;

  return (
    <ConditionalView
      style={{...viewStyle, ...props.style}}
      scrollable={props.scrollable}
    >
      {props.children}
    </ConditionalView>
  );
};

PageContainer.propTypes = {
  children: PropType.node,
  style: PropType.object,
  scrollable: PropType.bool.isRequired,
};

const {colors} = SPS.variables;
const styles = {
  viewStyle: {
    flex: 1,
    backgroundColor: colors.backgroundColors.dark,
  },
};

export {PageContainer};
