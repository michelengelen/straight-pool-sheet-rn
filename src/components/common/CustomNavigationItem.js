import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropType from 'prop-types';
import {Icon} from 'react-native-elements';

import SPS from 'common/variables';
const {colors} = SPS.variables;

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
    const {icon, label} = this.props;
    const {wrapperStyle} = styles;

    return (
      <View style={wrapperStyle}>
        {icon &&
          <Icon
            type={'ionicon'}
            name={icon}
          />
        }
        <Text>{label}</Text>
      </View>
    );
  }
}

CustomNavigationItem.propTypes = {
  icon: PropType.string,
  label: PropType.string,
};

CustomNavigationItem.displayName = 'Custom Navigation Drawer';

const styles = StyleSheet.create({
  wrapperStyle: {
    width: '100%',
    backgroundColor: colors.grey.darkest,
  },
  // DrawerStyles
  iconStyle: {
    color: colors.primary.full,
  },
  labelStyle: {
    color: colors.text.mid,
  },
});

export {CustomNavigationItem};
