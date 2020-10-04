/* eslint-disable global-require */
import React, { useRef, useState } from 'react'

import { ImageBackground, StyleSheet, View, Text, TextInput } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { useDispatch, useSelector } from 'react-redux'
import { AUTH_REGISTER } from '../redux/actions/types'
import { registerAction } from '../redux/actions/auth'

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
    backgroundColor: '#F3EBEA',
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
    backgroundColor: '#FFFFFF',
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

const AuthRegister = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const isLoading = useSelector((state) =>
    state.ui.isLoading.some(({ loadingType }) => loadingType === AUTH_REGISTER)
  )

  const passwordRef = useRef(null)

  const focusPassword = () => passwordRef.current?.focus()

  const handleSubmit = () => {
    dispatch(registerAction({ email: email.toLowerCase(), password }))
  }

  const onChangeEmail = (text) => {
    setEmail(text)
  }

  const onChangePassword = (text) => {
    setPassword(text)
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={styles.background}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Register for SipStir</Text>
          <Text style={styles.subtitle}>Enter your email and password.</Text>
        </View>
        <View style={styles.card}>
          <TextInput
            autoFocus
            onChangeText={onChangeEmail}
            onSubmitEditing={focusPassword}
            placeholder="Email"
            placeholderTextColor="#979797"
            style={[styles.textInput, { marginBottom: 7 }]}
            value={email}
          />
          <TextInput
            autoFocus
            onChangeText={onChangePassword}
            onSubmitEditing={handleSubmit}
            placeholder="Password"
            placeholderTextColor="#979797"
            secureTextEntry
            style={styles.textInput}
            value={password}
          />
        </View>
        <Button
          color="#5177FF"
          icon={() => <Icon color="#FFFFFF" name="profile" size={18} />}
          loading={isLoading}
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}>
          Register
        </Button>
        <KeyboardSpacer />
      </ImageBackground>
    </View>
  )
}

export default AuthRegister
