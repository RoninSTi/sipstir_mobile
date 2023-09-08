/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { PropsWithChildren } from 'react'
import { TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as ImageManipulator from 'expo-image-manipulator'
import * as mime from 'react-native-mime-types'

import { useActionSheet } from '@expo/react-native-action-sheet'
import { useDispatch, useSelector } from 'react-redux'

import axios, { AxiosRequestConfig } from 'axios'

import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import * as FileSystem from 'expo-file-system'
import { CAUGHT_ERROR } from '../redux/actions/types'

import clients from '../services/api'

const api = clients.default.client

type OnProgressParams = {
  progressData: number;
}

type OnSelectParams = {
  uri: string
}

type OnUploadCompleteParams = {
  url: string;
}

type Props = {
  onCancel: () => {};
  onPress: () => {};
  onProgress: (params: OnProgressParams) => {};
  onSelect: (params: OnSelectParams) => {};
  onUploadComplete: (params: OnUploadCompleteParams) => {};
  photoDimensions: {
    height: number;
    width: number;
  },
  style: object,
}

const PhotoUploader: React.FC<Props & PropsWithChildren> = ({
  children,
  onCancel,
  onPress,
  onProgress,
  onSelect,
  onUploadComplete,
  photoDimensions: {
    height = 800,
    width = 800
  },
  style,
}) => {
  const dispatch = useDispatch()

  const { showActionSheetWithOptions } = useActionSheet()

  const [cameraStatus, requestCameraPermissions] = ImagePicker.useCameraPermissions()

  const [libStatus, requestLibPermissions] = ImagePicker.useMediaLibraryPermissions()

  // @ts-ignore
  const authUser = useSelector((state) => state.auth.user)

  const processPhoto = async (result: ImagePicker.ImagePickerSuccessResult) => {
    const { uri } = result.assets[0]

    onSelect({ uri })

    try {
      const { uri: resizedUri } = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { height, width } }],
        { compress: 0.25, format: ImageManipulator.SaveFormat.JPEG, base64: false }
      )

      const base64 = await FileSystem.readAsStringAsync(resizedUri, {
        encoding: FileSystem.EncodingType.Base64,
      })

      const buffer = Buffer.from(base64, 'base64')

      const fileName = await nanoid()

      const fileType = mime.lookup(resizedUri)

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
      })

      const { signedRequest, url }: {signedRequest: string, url: string} = response.data

      const options: AxiosRequestConfig = {
        headers: {
          'Content-Type': fileType,
          'Content-Encoding': 'base64',
        },
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader('content-length') ||
              progressEvent.target.getResponseHeader('x-decompressed-content-length')
          if (totalLength !== null) {
            const progressData = Math.round((progressEvent.loaded * 100) / totalLength)

            if (onProgress) {
              onProgress({ progressData })
            }
          }
        },
      }

      await axios.put(signedRequest, buffer, options)

      if (onUploadComplete) {
        onUploadComplete({ url })
      }
    } catch (error) {
      dispatch({ type: CAUGHT_ERROR, error })
    }
  }

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      processPhoto(result)
    }
  }

  const openCameraRoll = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      processPhoto(result)
    }
  }

  const checkCameraPermission = async () => {
    if (Constants.platform?.ios) {
      if (cameraStatus?.status !== 'granted') {
        requestCameraPermissions()
      } else {
        openCamera()
      }
    } else {
      openCamera()
    }
  }

  const checkCameraRollPermission = async () => {
    if (Constants.platform?.ios) {
      if (libStatus?.status !== 'granted') {
        requestLibPermissions()
      } else {
        openCameraRoll()
      }
    } else {
      openCameraRoll()
    }
  }

  const openActionSheet = () => {
    const options = ['Camera', 'Photo Library', 'Cancel']
    const cancelButtonIndex = 2

    const title = 'Add a photo'
    const message =
      'Take a picture of your food/drink and location without giving away where you are!'

    showActionSheetWithOptions(
      {
        cancelButtonIndex,
        message,
        options,
        title,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            checkCameraPermission()
            break
          case 1:
            checkCameraRollPermission()
            break
          case cancelButtonIndex:
            if (onCancel) onCancel()
            break
          default:
            break
        }
      }
    )
  }

  const handleOnPress = () => {
    openActionSheet()

    if (onPress) onPress()
  }

  return (
    <TouchableOpacity onPress={handleOnPress} style={style}>
      {children}
    </TouchableOpacity>
  )
}

export default PhotoUploader
