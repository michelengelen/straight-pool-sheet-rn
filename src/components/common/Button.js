import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { LoadingIndicator } from './LoadingIndicator';

const Button = ({ onPress, loading, buttonText }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      {loading ? <LoadingIndicator size={'medium'} /> : <Text style={textStyle}>{buttonText}</Text>}
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    margin: 15,
    padding: 10,
    minHeight: 30
  },
};

export { Button };
