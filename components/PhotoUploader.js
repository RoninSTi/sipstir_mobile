import React from 'react';

import { TouchableOpacity } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import * as mime from 'react-native-mime-types';

import { useActionSheet } from '@expo/react-native-action-sheet';
import { useSelector } from 'react-redux'

import axios from 'axios'

import { v4 as uuidv4 } from 'uuid';
import * as FileSystem from 'expo-file-system';
import clients from '../services/api';

const api = clients.default.client;

const PhotoUploader = ({ children, onCancel, onPress, onProgress, onUploadComplete, photoDimensions, style }) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const authUser = useSelector(state => state.auth.user)

  const processPhoto = async result => {
    const { uri } = result;
    try {
      const { height, width } = photoDimensions;

      const { uri: resizedUri } = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { height, width } }],
        { compress: 0.25, format: ImageManipulator.SaveFormat.JPEG, base64: false }
      );

      const base64 = await FileSystem.readAsStringAsync(resizedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const buffer = Buffer.from(base64, 'base64');

      const fileName = uuidv4();
      const fileType = mime.lookup(resizedUri);

      const response = await api({
        method: 'post',
        url: 'upload/signedurl/image',
        data: {
          fileName,
          fileType,
        },
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      });

      const { signedRequest, url } = response.data;

      const options = {
        headers: {
          'Content-Type': fileType,
          'Content-Encoding': 'base64',
        },
        onUploadProgress: progressEvent => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader('content-length') ||
            progressEvent.target.getResponseHeader('x-decompressed-content-length');
          if (totalLength !== null) {
            const progressData = Math.round((progressEvent.loaded * 100) / totalLength);

            if (onProgress) {
              onProgress({ progressData })
            }
          }
        },
      };

      await axios.put(signedRequest, buffer, options);

      if (onUploadComplete) {
        onUploadComplete({ url })
      }
    } catch (error) {
      console.log({ error })
    }
  }

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      processPhoto(result);
    }
  };

  const openCameraRoll = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      processPhoto(result);
    }
  };

  const checkCameraPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      } else {
        openCamera();
      }
    } else {
      openCamera();
    }
  };

  const checkCameraRollPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      } else {
        openCameraRoll();
      }
    } else {
      openCameraRoll();
    }
  };

  const openActionSheet = () => {
    const options = ['Camera', 'Photo Library', 'Cancel'];
    const cancelButtonIndex = 2;

    const title = 'Add a photo';
    const message =
      'Take a picture of your food/drink and location without giving away where you are!';

    showActionSheetWithOptions(
      {
        cancelButtonIndex,
        message,
        options,
        title,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            checkCameraPermission();
            break;
          case 1:
            checkCameraRollPermission();
            break
          case cancelButtonIndex:
            if (onCancel) onCancel()
            break;
          default:
            break;
        }
      }
    );
  };

  const handleOnPress = () => {
    openActionSheet();

    if (onPress) onPress()
  };

  return (
    <TouchableOpacity onPress={handleOnPress} style={style}>
      {children}
    </TouchableOpacity>
  )
}

export default PhotoUploader