import React from 'react';

import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 28,
    width: '100%',
  },
});

const PostSeparator = () => {
  return <View style={styles.container} />;
};

export default PostSeparator;
