import React, { useEffect } from 'react'

import { StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useDispatch } from 'react-redux'
import { SET_AUTH_USER, SET_AUTH_LOADING } from '../redux/actions/types'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
  },
})

const AuthLoadingScreen = () => {
  const dispatch = useDispatch()

  const checkLoggedIn = async () => {
    const userData = await AsyncStorage.getItem('user')

    if (userData) {
      const { avatar, email, id, token, username } = JSON.parse(userData)

      dispatch({
        type: SET_AUTH_USER,
        payload: {
          avatar,
          email,
          id,
          token,
          username,
        },
      })
    } else {
      dispatch({ type: SET_AUTH_LOADING, payload: false })
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
