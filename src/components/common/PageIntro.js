import React from 'react';
import {Text, View} from 'react-native';
import PropType from 'prop-types';

import SPS from 'Common/variables';

const PageIntro = (props) => {
  const {
    textStyle,
    headlineStyle,
    headlineViewStyle,
    viewStyle,
  } = styles;

  return (
    <View style={viewStyle}>
      <View style={headlineViewStyle}>
        <Text style={headlineStyle}>{props.headerText}</Text>
      </View>
      <Text style={textStyle}>{props.introText}</Text>
    </View>
  );
};

PageIntro.propTypes = {
  headerText: PropType.string.isRequired,
  introText: PropType.string.isRequired,
};

const {colors, sizes} = SPS.variables;
const {dimensions} = sizes;

const styles = {
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    padding: sizes.gutter,
    position: 'relative',
  },
  headlineViewStyle: {
    width: (dimensions.width - 2 * sizes.gutter),
    borderBottomWidth: 1,
    borderColor: colors.textColor,
    marginBottom: sizes.gutter,
  },
  headlineStyle: {
    color: colors.textColor,
    fontSize: sizes.font_XL,
    paddingBottom: sizes.gutter / 2,
  },
  textStyle: {
    color: colors.textColorDim,
    fontSize: sizes.font_M,
  },
};

export {PageIntro};
