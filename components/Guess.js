import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { createCommentAction } from '../redux/actions/guess'
import { CREATE_COMMENT } from '../redux/actions/types'

import { Dimensions, StyleSheet, Text, View } from 'react-native';

import CaptionInput from './CaptionInput';
import GuessHeader from './GuessHeader';
import CommentList from './CommentList';

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  container: {
    marginBottom: 14,
    width: Dimensions.get('window').width - 2 * 28,
  },
  guessText: {
    color: '#AAAAAA',
    fontSize: 12,
    marginBottom: 8,
  },
});

const Guess = ({ guess }) => {
  const dispatch = useDispatch()

  const [text, setText] = useState('')

  const { token } = useSelector(state => state.auth.user)

  const isLoading = useSelector(state => state.ui.isLoading)

  const user = useSelector(state => state.user)

  const isYou = user.id === guess.createdById;

  const handleOnChangeText = text => setText(text)

  const onPress = () => {
    dispatch(createCommentAction({ createdById: user.id, guessId: guess.id, text, token }))
    setText('')
  };

  const loading = isLoading.some(
    item => item.loadingType === CREATE_COMMENT && item.meta === guess.id
  );

  return (
    <View style={styles.container}>
      <Text style={styles.guessText}>{`${
        isYou ? 'You' : guess.createdBy.username
        } guessed...`}</Text>
      <View style={styles.bubble}>
        <GuessHeader guess={guess} />
        <CommentList guess={guess} />
        <CaptionInput
          backgroundColor="#F9F9F9"
          isLoading={loading}
          onChangeText={handleOnChangeText}
          onPress={onPress}
          placeholder="Write a reply..."
          showButtonOnFocus
          value={text}
          title="Reply"
        />
      </View>
    </View>
  );
};

export default Guess;
