import React from 'react';
import {StatusBar, View} from 'react-native';
import PropType from 'prop-types';

import SPS from 'common/variables';

const CustomStatusBar = (props) => {
  let {viewStyle} = styles;
  // TODO@Michel: Add conditional style for light and dark layouts
  // const statusBarStyle = props.darkMode ? 'light-content' : 'dark-content';

  return (
    <View style={{...viewStyle, backgroundColor: props.backgroundColor}}>
      <StatusBar barStyle={props.barStyle}/>
    </View>
  );
};

CustomStatusBar.propTypes = {
  barStyle: PropType.string.isRequired,
  backgroundColor: PropType.string.isRequired,
  darkMode: PropType.bool.isRequired,
};

const {colors, sizes} = SPS.variables;
const styles = {
  viewStyle: {
    width: sizes.dimensions.width,
    height: 21,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    elevation: 4,
    position: 'relative',
  },
};

export {CustomStatusBar};
