// Import libraries for making a component
import React from 'react';
import {Text, View} from 'react-native';
import PropType from 'prop-types';
import SPS from 'Common/variables';

// Make a component
const Header = (props) => {
  const {textStyle, viewStyle} = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText.toUpperCase()}</Text>
    </View>
  );
};

Header.propTypes = {
  headerText: PropType.string.isRequired,
};

const {colors, sizes} = SPS.variables;
const styles = {
  viewStyle: {
    backgroundColor: colors.backgroundColors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: sizes.gutter / 1.5,
    paddingBottom: sizes.gutter / 1.5,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    borderBottomWidth: 2,
    borderBottomColor: colors.backgroundColors.primary,
  },
  textStyle: {
    color: colors.textColor,
    fontSize: sizes.font_L,
  },
};

// Make the component available to other parts of the app
export {Header};
