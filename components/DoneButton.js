import React from 'react'

import { StyleSheet } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { Button } from 'react-native-paper'

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    letterSpacing: 0,
  },
})

const DoneButton = () => {
  const { navigate } = useNavigation()

  const onPress = () => {
    navigate('Main')
  }

  return (
    <Button textColor="#FFFFFF" labelStyle={styles.button} onPress={onPress} uppercase={false}>
      Done
    </Button>
  )
}

export default DoneButton
