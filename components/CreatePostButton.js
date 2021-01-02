/* eslint-disable global-require */
import React from 'react'

import { Image } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { useDispatch } from 'react-redux'
import {
  SET_IS_CREATING_POST,
  SET_POST_IMAGE,
  SET_POST_IMAGE_UPLOAD_PROGRESS,
  SET_POST_IMAGE_URI,
} from '../redux/actions/types'

import PhotoUploader from './PhotoUploader'

const CreatePostButton = () => {
  const dispatch = useDispatch()

  const { navigate } = useNavigation()

  const handleOnCancel = () => {
    dispatch({ type: SET_IS_CREATING_POST, payload: false })
  }

  const handleOnPress = () => {
    dispatch({ type: SET_IS_CREATING_POST, payload: true })
  }

  const handleOnProgress = ({ progressData }) => {
    dispatch({ type: SET_POST_IMAGE_UPLOAD_PROGRESS, payload: progressData })
  }

  const handleOnSelect = ({ uri }) => {
    dispatch({
      type: SET_POST_IMAGE_URI,
      payload: uri,
    })

    navigate('Create')
  }

  const handleUploadComplete = ({ url }) => {
    dispatch({ type: SET_POST_IMAGE, payload: url })
  }

  return (
    <PhotoUploader
      onCancel={handleOnCancel}
      onPress={handleOnPress}
      onProgress={handleOnProgress}
      onSelect={handleOnSelect}
      onUploadComplete={handleUploadComplete}
      photoDimensions={{ height: 800, width: 800 }}
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{ width: 25, height: 25, tintColor: 'rgba(231, 73, 62, 0.96)' }}
        source={require('../assets/images/icon_plus.png')}
      />
    </PhotoUploader>
  )
}

export default CreatePostButton
