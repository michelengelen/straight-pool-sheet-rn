import React from 'react';
import {View} from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';

import {Fade} from 'components/common';
import Images from 'assets/images';
import SPS from 'common/variables';

const LoadingIndicator = ({visible, size}) => {
  const {containerStyle, fadeStyle} = styles;
  const {loader} = Images;

  switch (size) {
    case 'full-size':
      return (
        <Fade visible={visible} style={fadeStyle}>
          <View style={containerStyle}>
            <Image source={loader} style={{width: 80, height: 20}} />
          </View>
        </Fade>
      );
    case 'medium':
      return <Image source={loader} style={{width: 60, height: 15}} />;
    default:
      return <Image source={loader} style={{width: 20, height: 5}} />;
  }
};

LoadingIndicator.propTypes = {
  size: PropTypes.string,
};

const {colors, sizes} = SPS.variables;
const styles = {
  fadeStyle: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: sizes.dimensions.width,
    height: sizes.dimensions.height,
    backgroundColor: colors.grey.darkest,
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export {LoadingIndicator};
