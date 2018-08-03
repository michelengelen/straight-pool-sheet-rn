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
      <View
        style={{
          ...headlineViewStyle,
          alignItems: props.alignHeadline || 'flex-start',
        }}
      >
        <Text style={headlineStyle}>
          {props.headerText}
        </Text>
      </View>
      <Text style={textStyle}>{props.introText}</Text>
    </View>
  );
};

PageIntro.propTypes = {
  headerText: PropType.string.isRequired,
  introText: PropType.string,
  alignHeadline: PropType.string,
};

const {colors, sizes} = SPS.variables;
const styles = {
  viewStyle: {
    alignItems: 'stretch',
    padding: sizes.gutter,
    position: 'relative',
  },
  headlineViewStyle: {
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
