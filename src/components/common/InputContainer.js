import React from 'react';
import PropType from 'prop-types';
import {View, Text} from 'react-native';

import SPS from 'Common/variables';

/**
 * InputContainer for every available Input component
 *
 * @param   {object}  props
 * @return  {jsx}     React node
 * @constructor
 */
const InputContainer = (props) => {
  const {
    children,
    headline,
  } = props;
  const {
    subContainerStyle,
    headlineStyle,
    containerStyle,
  } = styles;

  return (
    <View style={containerStyle}>
      {headline &&
        <View style={subContainerStyle}>
          <Text style={headlineStyle}>{headline.toUpperCase()}</Text>
        </View>
      }
      <View
        style={{
          paddingTop: sizes.gutter / 2,
          paddingBottom: sizes.gutter / 2,
        }}
      >
        {children}
      </View>
    </View>
  );
};

InputContainer.propTypes = {
  headline: PropType.string,
  children: PropType.node,
};

const {colors, sizes} = SPS.variables;
const styles = {
  containerStyle: {
    paddingLeft: sizes.gutter / 2,
    paddingRight: sizes.gutter / 2,
    margin: sizes.gutter / 2,
    marginTop: sizes.gutter / 4,
    marginBottom: sizes.gutter / 4,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: colors.backgroundColors.darker,
    borderRadius: 10,
  },
  subContainerStyle: {
    paddingTop: sizes.gutter / 4,
    paddingBottom: sizes.gutter / 4,
    borderBottomWidth: 1,
    borderColor: colors.borderColorDim,
  },
  headlineStyle: {
    color: colors.textColorDim,
    fontSize: sizes.font_M,
    padding: (sizes.gutter / 4),
    textAlign: 'center',
  },
};

export {InputContainer};
