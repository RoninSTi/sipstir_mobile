import React from 'react';

import { Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useDispatch } from 'react-redux'
import { SET_IS_CREATING_POST, SET_POST_IMAGE } from '../redux/actions/types'

import PhotoUploader from './PhotoUploader'

const CreatePostButton = () => {
  const dispatch = useDispatch()

  const { navigate } = useNavigation();

  const handleOnCancel = () => {
    dispatch({ type: SET_IS_CREATING_POST, payload: false })
  }

  const handleOnPress = () => {
    dispatch({ type: SET_IS_CREATING_POST, payload: true})
  }

  const handleUploadComplete = ({ url }) => {
    dispatch({ type: SET_POST_IMAGE, payload: url })

    navigate('Create');
  }

  return (
    <PhotoUploader
      onCancel={handleOnCancel}
      onPress={handleOnPress}
      onUploadComplete={handleUploadComplete}
      photoDimensions={{ height: 800, width: 800 }}
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        style={{ width: 25, height: 25, tintColor: 'rgba(231, 73, 62, 0.96)' }}
        source={require('../assets/images/icon_plus.png')}
      />
    </PhotoUploader>
  );
};

export default CreatePostButton;
