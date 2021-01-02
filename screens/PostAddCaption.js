/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'

import { Dimensions, Image, StyleSheet, View, Text, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { useDispatch, useSelector } from 'react-redux'
import { SET_POST_IMAGE, SET_POST_CAPTION } from '../redux/actions/types'

import AddCommentHeader from '../components/AddCommentHeader'
import PhotoUploader from '../components/PhotoUploader'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF3F2',
    borderRadius: 28,
    flex: 1,
    overflow: 'hidden',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    width: 40,
  },
  image: {
    width: width - 2 * 14,
    height: width - 2 * 14,
  },
  inputContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 14,
  },
  photoHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    paddingRight: 7,
  },
  wrapper: {
    backgroundColor: 'black',
    flex: 1,
  },
})

const PostAddCaption = () => {
  const dispatch = useDispatch()

  const caption = useSelector((state) => state.createPost.caption)

  const imageURI = useSelector((state) => state.createPost.imageURI)

  const location = useSelector((state) => state.createPost.location)

  const handleOnChangeText = (text) => {
    dispatch({ type: SET_POST_CAPTION, payload: text })
  }
  const handleUploadComplete = ({ url }) => {
    dispatch({ type: SET_POST_IMAGE, payload: url })
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Icon color="#CFCFCF" name="chat" size={30} />
        </View>
        <TextInput
          autoFocus
          multiline
          onChangeText={handleOnChangeText}
          placeholder="Type a hint..."
          placeholderTextColor="#979797"
          style={{ color: '#434343', flex: 1, fontSize: 16 }}
          value={caption}
        />
      </View>
      <AddCommentHeader selectedPlace={location} />
      <View style={styles.photoHeader}>
        <View style={styles.iconContainer}>
          <Icon color="#CFCFCF" name="camera" size={30} />
        </View>
        <Text style={{ color: '#9C9C9C', flex: 1 }}>Don&apos;t give away your location! 👍</Text>
        <PhotoUploader
          onUploadComplete={handleUploadComplete}
          photoDimensions={{ height: 800, width: 800 }}>
          <Button color="#E85349">Change</Button>
        </PhotoUploader>
      </View>
      {imageURI && (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <View
            style={{
              borderRadius: 14,
              overflow: 'hidden',
              width: width - 2 * 14,
              height: width - 2 * 14,
            }}>
            <Image source={{ uri: imageURI }} style={styles.image} />
          </View>
        </View>
      )}
    </KeyboardAwareScrollView>
  )
}

export default PostAddCaption
