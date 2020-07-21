import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

const ScreenLoader = ({ loading, children }) => {
  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator color="#D7D0CF" size="large" />
    </View>
  ) : (
      children
    );
};

ScreenLoader.defaultProps = {
  loading: false,
};

ScreenLoader.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ScreenLoader;
