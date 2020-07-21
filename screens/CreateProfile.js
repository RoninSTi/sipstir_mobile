/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable global-require */
import React, { useState } from 'react';

import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Avatar, Button, ActivityIndicator } from 'react-native-paper';
// import { SafeAreaView } from 'react-native-safe-area-context';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import * as mime from 'react-native-mime-types';

import { useActionSheet } from '@expo/react-native-action-sheet';

import axios from 'axios'

import { v4 as uuidv4 } from 'uuid';
import * as FileSystem from 'expo-file-system';
import clients from '../services/api';

import { CREATE_PROFILE, SET_AVATAR, SET_USERNAME } from '../redux/actions/types';
import { useDispatch, useSelector } from 'react-redux'
import { createProfileAction } from '../redux/actions/createProfile';

import KeyboardSpacer from 'react-native-keyboard-spacer';

const api = clients.default.client;

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

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
});

const CreateProfile = () => {
  const dispatch = useDispatch()

  const username = useSelector(state => state.createProfile.username)

  const avatar = useSelector(state => state.createProfile.avatar)

  const authUser = useSelector(state => state.auth.user)

  const showAvailableIndicator = useSelector(state => state.createProfile.showAvailableIndicator)

  const isLoading = useSelector(state => state.ui.isLoading)

  const usernameButtonDisabled = useSelector(state => {
    const { isAvailable, username: un } = state.createProfile;

    return !isAvailable || username.length === 0
  })

  const { showActionSheetWithOptions } = useActionSheet();

  const [isUploading, setIsUploading] = useState(false);

  const onChangeText = text => {
    dispatch({
      type: SET_USERNAME,
      payload: text
    })
  };

  const setPhoto = async result => {
    const { uri } = result;

    const { uri: resizedUri } = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { height: 300, width: 300 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG, base64: true }
    );

    const base64 = await FileSystem.readAsStringAsync(resizedUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const buffer = Buffer.from(base64, 'base64');

    const fileName = uuidv4();
    const fileType = mime.lookup(resizedUri);

    try {
      setIsUploading(true);

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

            console.log({ progressData });
          }
        },
      };

      await axios.put(signedRequest, buffer, options);

      dispatch({
        type: SET_AVATAR,
        payload: url
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setIsUploading(false);
    }
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result);
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
      setPhoto(result);
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
    }
  };

  const openActionSheet = () => {
    const options = ['Camera', 'Photo Library', 'Cancel'];
    const cancelButtonIndex = 2;

    const title = 'Change your avatar';
    const message = 'Lemme take a selfie...';

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
            break;
          default:
            break;
        }
      }
    );
  };

  const onPress = () => {
    openActionSheet();
  };

  const onPressContinue = async () => {
    dispatch(createProfileAction({ userId: authUser.id, avatar, token: authUser.token, username }))
  };

  const showLoadingIndicator = isLoading.some(item => item.loadingType === CREATE_PROFILE);

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
            <Button color="#5177FF" onPress={onPress}>
              {avatar ? 'Change Photo' : 'Add Photo'}
            </Button>
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
  );
};

export default CreateProfile;
