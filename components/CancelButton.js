import React from 'react';
import PropTypes from 'prop-types';

import { useNavigation } from '@react-navigation/native';

import { Button } from 'react-native-paper';

const CancelButton = ({ onPress, title }) => {
  const { navigate } = useNavigation();

  const handleOnPress = () => {
    if (onPress) onPress()
    
    navigate('Main', {
      screen: 'Root'
    })
  };

  return (
    <Button
      color="#FFFFFF"
      labelStyle={{ fontSize: 18, letterSpacing: 0 }}
      onPress={handleOnPress}
      uppercase={false}>
      {title}
    </Button>
  );
};

CancelButton.defaultProps = {
  title: 'Cancel',
};

CancelButton.propTypes = {
  title: PropTypes.string,
};

export default CancelButton;
