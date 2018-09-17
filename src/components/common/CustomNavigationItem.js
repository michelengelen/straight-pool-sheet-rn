import React, {PureComponent} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import PropType from 'prop-types';
import {Icon} from 'react-native-elements';

import SPS from 'common/variables';
const {colors, sizes} = SPS.variables;

/**
 * class for rendering the navigation drawer
 * it gets taken in by the DrawerNavigatorConfig property in App.js
 */
class CustomNavigationItem extends PureComponent {
  /**
   * react constructor call
   * @param {object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * react render function
   * @return {jsx}
   */
  render() {
    const {icon, label, navigate, navigateButton, active} = this.props;
    const {wrapperStyle, iconView, labelStyle} = styles;

    const backgroundStyle = {};
    if (this.props.backgroundColor) {
      backgroundStyle.backgroundColor = this.props.backgroundColor;
    } else if (active) {
      backgroundStyle.backgroundColor = colors.grey.mid;
    }

    let combinedWrapperStyle = [wrapperStyle, backgroundStyle];

    return (
      <TouchableOpacity
        style={combinedWrapperStyle}
        onPress={navigate}
      >
        {icon &&
          <View style={iconView}>
            <Icon
              type={'ionicon'}
              name={icon}
              color={colors.primary.full}
            />
          </View>
        }
        <Text style={labelStyle}>{label}</Text>
        {navigateButton &&
          <View style={{...iconView, position: 'absolute', right: sizes.gutter * .7}}>
            <Icon
              type={'ionicon'}
              name={'md-arrow-dropright'}
              color={colors.text.dark}
            />
          </View>
        }
      </TouchableOpacity>
    );
  }
}

CustomNavigationItem.propTypes = {
  icon: PropType.string,
  label: PropType.string,
  backgroundColor: PropType.string,
  active: PropType.bool,
  navigateButton: PropType.bool,
  navigate: PropType.func,
};

CustomNavigationItem.displayName = 'Custom Navigation Drawer Item';

const styles = StyleSheet.create({
  wrapperStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.grey.darkest,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.grey.mid,
  },
  // DrawerStyles
  labelStyle: {
    flex: 8,
    paddingVertical: sizes.gutter * .75,
    fontSize: sizes.font_L,
    color: colors.text.mid,
    fontWeight: 'bold',
  },
  iconView: {
    flex: 1,
    padding: sizes.gutter * .75,
    aspectRatio: 1,
  },
});

export {CustomNavigationItem};
