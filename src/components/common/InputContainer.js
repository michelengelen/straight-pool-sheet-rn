import React from 'react';
import PropType from 'prop-types';
import {View, Text} from 'react-native';

import SPS from 'common/variables';

/**
 * renders the InputContainer header if there is a headline or value input
 *
 * @param     {object}  props
 * @return    {jsx}     React node
 * @constructor
 */
const InputHeader = (props) => {
  const {headline, value, component} = props;
  const {
    headerContainerStyle,
    headlineStyle,
    headlineContainerStyle,
    valueStyle,
    valueContainerStyle,
  } = styles;

  return (
    <View style={headerContainerStyle}>
      {headline &&
        <View style={headlineContainerStyle}>
          <Text style={headlineStyle}>{headline.toUpperCase()}</Text>
        </View>
      }
      {(value && !component) &&
        <View style={valueContainerStyle}>
          <Text style={valueStyle}>{value}</Text>
        </View>
      }
      {component && component}
    </View>
  );
};

InputHeader.propTypes = {
  headline: PropType.string,
  value: PropType.oneOfType([
    PropType.string,
    PropType.number,
  ]),
  component: PropType.node,
};

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
    description,
    value,
    component,
  } = props;

  const {
    containerStyle,
    descriptionContainer,
    descriptionText,
  } = styles;

  return (
    <View style={containerStyle}>
      {(headline || value) &&
        <InputHeader
          headline={headline && headline}
          value={value && value}
          component={component && component}
        />
      }
      {children &&
        <View
          style={{
            paddingTop: sizes.gutter / 2,
            paddingBottom: sizes.gutter / 2,
          }}
        >
          {children}
        </View>
      }
      {description &&
        <View style={descriptionContainer}>
          <Text style={descriptionText}>{description}</Text>
        </View>
      }
    </View>
  );
};

InputContainer.propTypes = {
  children: PropType.node,
  headline: PropType.string,
  description: PropType.string,
  value: PropType.oneOfType([
    PropType.string,
    PropType.number,
  ]),
  component: PropType.node,
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
    backgroundColor: colors.grey.dark,
    borderRadius: 10,
  },
  headerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: sizes.gutter / 4,
    paddingBottom: sizes.gutter / 4,
    borderBottomWidth: 1,
    borderColor: colors.borderColorDim,
  },
  headlineContainerStyle: {
    flex: 3,
    alignItems: 'stretch',
  },
  headlineStyle: {
    color: colors.text.mid,
    fontSize: sizes.font_M,
    padding: (sizes.gutter / 4),
    textAlign: 'left',
  },
  valueContainerStyle: {
    flex: 1,
    alignItems: 'stretch',
  },
  valueStyle: {
    color: colors.text.light,
    fontSize: sizes.font_M,
    padding: (sizes.gutter / 4),
    textAlign: 'right',
  },
  descriptionContainer: {
    borderTopWidth: 1,
    borderColor: colors.text.mid,
  },
  descriptionText: {
    fontSize: sizes.font_M,
    paddingVertical: sizes.gutter / 2,
    color: colors.text.mid,
  },
};

export {InputContainer};
