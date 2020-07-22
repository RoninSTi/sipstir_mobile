/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable global-require */
import React, { useState } from 'react'

import { Dimensions, Image, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native'
import { Avatar, Button, ActivityIndicator } from 'react-native-paper'

import { useDispatch, useSelector } from 'react-redux'
import KeyboardSpacer from 'react-native-keyboard-spacer'

import { CREATE_PROFILE, SET_AVATAR, SET_USERNAME } from '../redux/actions/types'
import { createProfileAction } from '../redux/actions/createProfile'

import PhotoUploader from '../components/PhotoUploader'

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window')

const styles = StyleSheet.create({
  activityContainer: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  avatarContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 75,
    height: 150,
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#BCBCCA',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 30,
    width: 150,
  },
  avatar: {
    overflow: 'hidden',
    borderRadius: 73,
    height: 146,
    width: 146,
  },
  avatarText: {
    color: '#898A8D',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 14,
  },
  button: {
    borderRadius: 20,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 28,
  },
  userIndicator: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 7,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    color: '#000000',
    marginBottom: 14,
    padding: 14,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: '100%',
    fontSize: 16,
  },
})

const CreateProfile = () => {
  const dispatch = useDispatch()

  const username = useSelector((state) => state.createProfile.username)

  const avatar = useSelector((state) => state.createProfile.avatar)

  const authUser = useSelector((state) => state.auth.user)

  const showAvailableIndicator = useSelector((state) => state.createProfile.showAvailableIndicator)

  const isLoading = useSelector((state) => state.ui.isLoading)

  const usernameButtonDisabled = useSelector((state) => {
    const { isAvailable, username: un } = state.createProfile

    return !isAvailable || un.length === 0
  })

  const [isUploading, setIsUploading] = useState(false)

  const onChangeText = (text) => {
    dispatch({
      type: SET_USERNAME,
      payload: text,
    })
  }

  const handleUploadComplete = ({ url }) => {
    dispatch({
      type: SET_AVATAR,
      payload: url,
    })
  }

  const handleProgress = ({ progressData }) => {
    switch (progressData) {
      case progressData > 0 && progressData < 100 && !isUploading:
        setIsUploading(true)
        break
      case progressData === 100 && isUploading:
        setIsUploading(false)
        break
      default:
        break
    }
  }

  const onPressContinue = async () => {
    dispatch(createProfileAction({ userId: authUser.id, avatar, token: authUser.token, username }))
  }

  const showLoadingIndicator = isLoading.some((item) => item.loadingType === CREATE_PROFILE)

  return (
    <View>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={{ width: WIDTH, height: HEIGHT }}>
        <View style={styles.container}>
          <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Text style={styles.avatarText}>YOUR AVATAR</Text>
            <View style={styles.avatarContainer}>
              {avatar ? (
                <Image style={styles.avatar} source={{ uri: avatar }} />
              ) : (
                <Avatar.Text size={45} label={username ? username[0] : 'u'} style={styles.avatar} />
              )}
              {isUploading && (
                <View style={styles.activityContainer}>
                  <ActivityIndicator size="small" color="#D7D0CF" />
                </View>
              )}
            </View>
            <PhotoUploader
              onProgress={handleProgress}
              onUploadComplete={handleUploadComplete}
              photoDimensions={{ height: 300, width: 300 }}>
              <Button color="#5177FF">{avatar ? 'Change Photo' : 'Add Photo'}</Button>
            </PhotoUploader>
          </View>
          <View style={{ height: 20 }}>
            {showAvailableIndicator && (
              <Text
                style={[
                  styles.userIndicator,
                  { color: usernameButtonDisabled ? '#E2434D' : '#27B92D' },
                ]}>
                {usernameButtonDisabled ? 'TAKEN' : 'AVAILABLE'}
              </Text>
            )}
          </View>
          <TextInput
            autoCapitalize="none"
            autoFocus
            onChangeText={onChangeText}
            placeholder="Select username..."
            style={styles.input}
            value={username}
          />
          <Button
            color="#5177FF"
            disabled={usernameButtonDisabled}
            loading={showLoadingIndicator}
            mode="contained"
            onPress={onPressContinue}
            style={styles.button}>
            Continue
          </Button>
        </View>
        <KeyboardSpacer topSpacing={20} />
      </ImageBackground>
    </View>
  )
}

export default CreateProfile
