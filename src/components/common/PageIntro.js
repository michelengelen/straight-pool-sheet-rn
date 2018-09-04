import React from 'react';
import {Text, View} from 'react-native';
import PropType from 'prop-types';

import SPS from 'common/variables';

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
          marginBottom: props.introText ? 20 : 5,
        }}
      >
        <Text style={headlineStyle}>
          {props.headerText}
        </Text>
      </View>
      {props.introText &&
        <Text style={textStyle}>{props.introText}</Text>
      }
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
    position: 'relative',
  },
  headlineViewStyle: {
    borderBottomWidth: 1,
    borderColor: colors.text.dark,
    marginBottom: sizes.gutter / 2,
  },
  headlineStyle: {
    color: colors.text.light,
    fontSize: sizes.font_XL,
    paddingTop: sizes.gutter / 2,
    paddingBottom: sizes.gutter / 2,
  },
  textStyle: {
    color: colors.text.mid,
    fontSize: sizes.font_M,
  },
};

export {PageIntro};
