import React, { useEffect } from 'react'

import { AsyncStorage, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation } from '@react-navigation/native'

import { useDispatch } from 'react-redux'
import { SET_AUTH_USER } from '../redux/actions/types'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
  },
})

const AuthLoadingScreen = () => {
  const { navigate } = useNavigation()

  const dispatch = useDispatch()

  const checkLoggedIn = async () => {
    const userData = await AsyncStorage.getItem('user')

    if (userData) {
      const { avatar, email, token, username } = JSON.parse(userData)

      dispatch({
        type: SET_AUTH_USER,
        payload: {
          avatar,
          email,
          token,
          username,
        },
      })
    } else {
      navigate('Auth')
    }
  }

  useEffect(() => {
    checkLoggedIn()
  }, [checkLoggedIn])

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator color="#D7D0CF" size="large" />
    </SafeAreaView>
  )
}

export default AuthLoadingScreen
