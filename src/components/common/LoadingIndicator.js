import React from 'react';
import {View} from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';

import Images from 'assets/images';

const LoadingIndicator = ({size}) => {
  const {containerStyle} = styles;
  const {loader} = Images;

  switch (size) {
    case 'full-size':
      return (
        <View style={containerStyle}>
          <Image source={loader} style={{width: 120, height: 30}} />
        </View>
      );
    case 'medium':
      return <Image source={loader} style={{width: 80, height: 20}} />;
    default:
      return <Image source={loader} style={{width: 40, height: 10}} />;
  }
};

LoadingIndicator.propTypes = {
  size: PropTypes.string,
};

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export {LoadingIndicator};
