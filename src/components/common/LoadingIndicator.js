import React from 'react';
import { View } from 'react-native';
import Image from 'react-native-remote-svg';

const LoadingIndicator = ({ size }) => {
  const { containerStyle } = styles;
  const dots = require('../../assets/dots.svg');

  switch (size) {
    case 'full-size':
      return (
        <View style={containerStyle}>
          <Image source={dots} style={{ width: 120, height: 30 }} />
        </View>
      );
    case 'medium':
      return <Image source={dots} style={{ width: 80, height: 20 }} />;
    default:
      return <Image source={dots} style={{ width: 40, height: 10 }} />;
  }
};

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export { LoadingIndicator };
