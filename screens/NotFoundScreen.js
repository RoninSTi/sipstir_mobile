import * as React from 'react'
import PropTypes from 'prop-types'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
})

export default function NotFoundScreen({ navigation }) {
  const { replace } = navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn&apost exist.</Text>
      <TouchableOpacity onPress={() => replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  )
}

NotFoundScreen.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
}
