import React from 'react';
import PropType from 'prop-types';
import {View, TouchableOpacity, Text} from 'react-native';
import {Icon} from 'react-native-elements';

// Custom Component imports
import {LoadingIndicator} from 'components/common';

// Constant imports
import SPS from 'common/variables';

const CustomButton = (props) => {
  const {containerStyle, buttonStyle, textStyle} = styles;
  const {buttonText, loading, style, iconLeft, iconRight, ...other} = props;

  // Decrease opacity when the button is disabled to make a change more visible
  textStyle.opacity = props.disabled ? 0.5 : 1;

  const renderIcon = (position, name) => {
    const marginKey = position === 'left' ? 'marginRight' : 'marginLeft';
    const alignSelf = position === 'left' ? 'flex-start' : 'flex-end';
    const iconSize = position === 'left' ? textStyle.fontSize * 1.2 : textStyle.fontSize * 1.3;
    const iconColor = position === 'left' ? colors.primary.dark : colors.text.dark;

    const viewStyle = {};
    if (position === 'right') {
      viewStyle.position = 'absolute';
      viewStyle.right = sizes.gutter;
    }

    return (
      <View style={viewStyle}>
        <Icon
          type={'ionicon'}
          name={name}
          color={iconColor}
          size={iconSize}
          iconStyle={{[marginKey]: sizes.gutter, alignSelf}}
        />
      </View>
    );
  };

  return (
    <View style={{...containerStyle, ...style}}>
      <TouchableOpacity style={buttonStyle} {...other}>
        {loading
          ? <LoadingIndicator size={'medium'} />
          : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                alignSelf: 'stretch',
                padding: sizes.gutter * .5,
                minHeight: 50,
              }}
            >
              {iconLeft && renderIcon('left', iconLeft)}
              <Text style={{...textStyle}}>{buttonText}</Text>
              {iconRight && renderIcon('right', iconRight)}
            </View>
          )
        }
      </TouchableOpacity>
    </View>
  );
};

CustomButton.propTypes = {
  children: PropType.node,
  style: PropType.object,
  disabled: PropType.bool,
  iconLeft: PropType.string,
  iconRight: PropType.string,
  buttonText: PropType.string.isRequired,
  loading: PropType.bool.isRequired,
};

const {colors, sizes} = SPS.variables;
const {getDimColor} = SPS;
const styles = {
  buttonStyle: {
    backgroundColor: getDimColor(colors.grey.mid, .5),
    borderColor: getDimColor(colors.grey.mid, .8),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: (sizes.gutter / 2),
    maxHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: sizes.font_L,
    color: colors.text.mid,
    fontWeight: 'bold',
  },
  containerStyle: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
};

export {CustomButton};
