/* eslint-disable global-require */
import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { useDispatch, useSelector } from 'react-redux'
import { forgotAuthAction } from '../redux/actions/auth'
import { AUTH_FORGOT } from '../redux/actions/types'

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  button: {
    borderRadius: 22,
    padding: 5,
    width: '100%',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    marginBottom: 28,
    padding: 28,
    width: '100%',
  },
  container: {
    padding: 14,
  },
  message: {
    color: '#65615E',
    fontSize: 14,
    textAlign: 'center',
  },
  subtitle: {
    color: '#898A8D',
    fontSize: 15,
  },
  textContainer: {
    paddingHorizontal: 28,
    marginBottom: 28,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 22,
    color: '#434343',
    height: 44,
    paddingLeft: 22,
  },
  title: {
    color: '#000000',
    fontSize: 23,
    marginBottom: 21,
    textAlign: 'center',
  },
})

const AuthForgot = ({ navigation }) => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const { navigate } = navigation

  const isLoading = useSelector((state) =>
    state.ui.isLoading.some(({ loadingType }) => loadingType === AUTH_FORGOT),
  )

  const handleRegister = () => {
    navigate('AuthRegister')
  }

  const handleSubmit = () => {
    dispatch(forgotAuthAction({ email: email.toLowerCase() }))
  }

  const onChangeEmail = (text) => {
    setEmail(text)
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={styles.background}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>Enter your email and get instructions via email.</Text>
        </View>
        <View style={styles.card}>
          <TextInput
            autoFocus
            onChangeText={onChangeEmail}
            placeholder="Email"
            placeholderTextColor="#979797"
            style={styles.textInput}
            value={email}
          />
        </View>
        <Button
          buttonColor="#5177FF"
          icon={() => <Icon color="#FFFFFF" name="mail" size={18} />}
          loading={isLoading}
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}>
          Begin Reset Process
        </Button>
        <KeyboardSpacer />
      </ImageBackground>
    </View>
  )
}

AuthForgot.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
}

export default AuthForgot
