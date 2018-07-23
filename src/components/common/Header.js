// Import libraries for making a component
import React from 'react';
import {Text, View} from 'react-native';
import PropType from 'prop-types';
import SPS from '../../common/variables';

// Make a component
const Header = (props) => {
  const {textStyle, viewStyle} = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

Header.propTypes = {
  headerText: PropType.string.isRequired,
};

const {colors, sizes} = SPS.variables;
const styles = {
  viewStyle: {
    backgroundColor: colors.backgroundColors.darker,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  textStyle: {
    color: colors.textColor,
    fontSize: sizes.font_XL,
  },
};

// Make the component available to other parts of the app
export {Header};
