import React from 'react';
import PropTypes from 'prop-types';

import { Ionicons } from '@expo/vector-icons';

import useColorScheme from '../hooks/useColorScheme';

import Colors from '../constants/Colors';

const TabBarIcon = ({ name, focused }) => {
  const colorScheme = useColorScheme();

  return (
    <Ionicons
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors[colorScheme].tabIconSelected : Colors[colorScheme].tabIconDefault}
    />
  );
};

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};

export default TabBarIcon;
