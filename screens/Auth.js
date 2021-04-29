/* eslint-disable react/style-prop-object */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Image, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native'
import { Button, Switch } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { StatusBar } from 'expo-status-bar'

import { useDispatch, useSelector } from 'react-redux'
import * as Linking from 'expo-linking'
import { ATTEMPT_APPLE_LOGIN, ATTEMPT_LOGIN } from '../redux/actions/types'

const styles = StyleSheet.create({
  button: {
    borderRadius: 22,
    padding: 5,
  },
  buttonContainer: {
    padding: 21,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: 150,
    marginBottom: 40,
    width: 150,
  },
  subtitle: {
    color: '#898A8D',
    fontSize: 15,
  },
  textContainer: {
    paddingHorizontal: 28,
  },
  title: {
    color: '#000000',
    fontSize: 23,
    marginBottom: 21,
    textAlign: 'center',
  },
  tosContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
})

const Auth = ({ navigation }) => {
  const [checked, setChecked] = useState(false)

  const isLoading = useSelector((state) => state.ui.isLoading)

  const dispatch = useDispatch()

  const checkAgreement = async () => {
    const agree = await AsyncStorage.getItem('@tos_agreement')

    if (agree === 'agree') {
      setChecked(true)
    }
  }

  useEffect(() => {
    checkAgreement()
  }, [checkAgreement])

  const { navigate } = navigation

  const login = () => {
    dispatch({ type: ATTEMPT_LOGIN })
  }

  const handleAppleLogin = () => {
    if (!checked) return

    dispatch({ type: ATTEMPT_APPLE_LOGIN })
  }

  const handleEmailLogin = () => {
    navigate('AuthEmail')
  }

  const storeChecked = async (valueToStore) => {
    await AsyncStorage.setItem('@tos_agreement', valueToStore ? 'agree' : 'disagree')
  }

  const handleSwitchChange = () => {
    setChecked((prev) => {
      const newValue = !prev

      storeChecked(newValue)

      return newValue
    })
  }

  const handleTos = () => {
    Linking.openURL('https://www.sipstir.app/terms')
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={{ width: '100%', height: '100%' }}>
        <View style={styles.contentContainer}>
          <Image source={require('../assets/images/icon_login.png')} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome to SipStir</Text>
            <Text style={styles.subtitle}>
              Discover new places and win prizes by guessing where people are eating and drinking!
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.tosContainer}>
            <Switch
              color="#5177FF"
              onValueChange={handleSwitchChange}
              style={{
                marginRight: 8,
              }}
              value={checked}
            />
            <Text>I agree to the </Text>
            <Button
              color="#5177FF"
              onPress={handleTos}
              style={{ marginLeft: -15 }}
              uppercase={false}>
              Terms of Service
            </Button>
          </View>
          {checked ? (
            <Button
              color="#5177FF"
              icon={() => <Icon color="#FFFFFF" name="facebook" size={18} />}
              loading={isLoading.some((item) => item.loadingType === ATTEMPT_LOGIN)}
              mode="contained"
              onPress={login}
              style={[styles.button, { marginBottom: 8 }]}>
              Log In With Facebook
            </Button>
          ) : (
            <Button
              color="#5177FF"
              icon={() => <Icon color="#FFFFFF" name="facebook" size={18} />}
              loading={isLoading.some((item) => item.loadingType === ATTEMPT_LOGIN)}
              mode="contained"
              style={[styles.button, styles.disabledButton, { marginBottom: 8 }]}>
              Log In With Facebook
            </Button>
          )}
          {Platform.OS === 'ios' && !checked && (
            <Button
              color="#5177FF"
              icon={() => <Icon color="#FFFFFF" name="apple" size={18} />}
              mode="contained"
              style={[styles.button, styles.disabledButton, { marginBottom: 8 }]}>
              Sign In With Apple
            </Button>
          )}
          {Platform.OS === 'ios' && checked && (
            <Button
              color="#5177FF"
              icon={() => <Icon color="#FFFFFF" name="apple" size={18} />}
              mode="contained"
              onPress={handleAppleLogin}
              style={[styles.button, { marginBottom: 8 }]}>
              Sign In With Apple
            </Button>
          )}
          {checked ? (
            <Button
              color="#5177FF"
              icon={() => <Icon color="#FFFFFF" name="mail" size={18} />}
              mode="contained"
              onPress={handleEmailLogin}
              style={styles.button}>
              Log In With Email
            </Button>
          ) : (
            <Button
              color="#5177FF"
              icon={() => <Icon color="#FFFFFF" name="mail" size={18} />}
              mode="contained"
              style={[styles.button, styles.disabledButton]}>
              Log In With Email
            </Button>
          )}
        </View>
      </ImageBackground>
    </View>
  )
}

Auth.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
}

export default Auth
