/* eslint-disable global-require */
import React, { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'

import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SET_GUESS_TEXT } from '../redux/actions/types'

import AddCommentHeader from '../components/AddCommentHeader'

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    width: 40,
  },
  inputContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 14,
  },
})

const GuessAddComment = ({ navigation }) => {
  const dispatch = useDispatch()

  const text = useSelector((state) => state.createGuess.text)

  const location = useSelector((state) => state.createGuess.location)

  const postId = useSelector((state) => state.createGuess.postId)

  const post = useSelector((state) => state.feed.posts.find((p) => p.id === postId))

  useLayoutEffect(() => {
    if (post) {
      navigation.setOptions({ title: `Where is ${post?.createdBy.username}?` })
    }
  }, [navigation, post])

  const handleOnChangeText = (guessText) => {
    dispatch({
      type: SET_GUESS_TEXT,
      payload: guessText,
    })
  }

  return (
    <KeyboardAvoidingView style={{ backgroundColor: '#FAF3F2', flex: 1 }}>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Icon color="#CFCFCF" name="chat" size={30} />
        </View>
        <TextInput
          autoFocus
          multiline
          onChangeText={handleOnChangeText}
          placeholder="Type a comment..."
          style={{ flex: 1, fontSize: 16 }}
          value={text}
        />
      </View>
      <AddCommentHeader selectedPlace={location} />
    </KeyboardAvoidingView>
  )
}

GuessAddComment.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
  }).isRequired,
}

export default GuessAddComment
