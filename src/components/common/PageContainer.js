import React from 'react';
import {StatusBar, View} from 'react-native';
import PropType from 'prop-types';
import SPS from 'Common/variables';

const PageContainer = (props) => {
  const {viewStyle} = styles;
  const statusBarStyle = props.darkMode ? 'light-content' : 'dark-content';

  return (
    <View style={{...viewStyle, ...props.style}}>
      <StatusBar barStyle={statusBarStyle} />
      {props.children}
    </View>
  );
};

PageContainer.propTypes = {
  children: PropType.node,
  darkMode: PropType.bool,
  style: PropType.object,
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
