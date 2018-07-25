import React from 'react';
import {StatusBar, View, ScrollView} from 'react-native';
import PropType from 'prop-types';

import SPS from 'Common/variables';

const ConditionalView = (props) => {
  const {scrollable, ...other} = props;

  if (scrollable) {
    return (
      <ScrollView {...other}>
        {props.children}
      </ScrollView>
    );
  }

  return (
    <View {...other}>
      {props.children}
    </View>
  );
};

ConditionalView.propTypes = {
  children: PropType.node,
  scrollable: PropType.bool.isRequired,
};

const PageContainer = (props) => {
  const {viewStyle} = styles;
  const statusBarStyle = props.darkMode ? 'light-content' : 'dark-content';

  return (
    <ConditionalView
      style={{...viewStyle, ...props.style}}
      scrollable={props.scrollable}
    >
      <StatusBar barStyle={statusBarStyle} />
      {props.children}
    </ConditionalView>
  );
};

PageContainer.propTypes = {
  children: PropType.node,
  darkMode: PropType.bool,
  style: PropType.object,
  scrollable: PropType.bool.isRequired,
};

const {colors} = SPS.variables;
const styles = {
  viewStyle: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: colors.backgroundColors.dark,
  },
};

// Make the component available to other parts of the app
export {PageContainer};
