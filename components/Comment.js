import React from 'react';

import { useSelector } from 'react-redux'

import { useActionSheet } from '@expo/react-native-action-sheet';

import { StyleSheet, Text, View } from 'react-native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

import Avatar from './Avatar';

const styles = StyleSheet.create({
  container: {
    padding: 14,
    flexDirection: 'row',
  },
  containerReply: {
    flexDirection: 'row-reverse',
  },
  bubble: {
    backgroundColor: '#EFEFEF',
    borderRadius: 20,
    marginLeft: 7,
    padding: 14,
    flexShrink: 1,
  },
  bubbleReply: {
    marginLeft: 0,
    marginRight: 7,
  },
  username: {
    color: '#999999',
    marginBottom: 6,
  },
});

const Comment = ({ comment, isOwner, isPreviousCommentSameUser, isNextCommentSameUser }) => {
  const user = useSelector(state => state.user)

  const { createdBy, id, text } = comment;

  const { showActionSheetWithOptions } = useActionSheet();

  const handleDeleteComment = () => {
    // deleteComment(id);
  };

  const openActionSheet = () => {
    const options = ['Delete Comment', 'Cancel'];
    const cancelButtonIndex = 1;

    const title = 'Admin Menu';
    const message = 'Admin actions you can take';

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
            handleDeleteComment();
            break;
          default:
            break;
        }
      }
    );
  };

  const onHandlerStateChange = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (user.role === 'admin') {
        openActionSheet();
      }
    }
  };

  return (
    <LongPressGestureHandler onHandlerStateChange={onHandlerStateChange}>
      <View
        style={[
          styles.container,
          isOwner ? undefined : styles.containerReply,
          isPreviousCommentSameUser ? { paddingTop: 1, paddingLeft: 59 } : undefined,
          isNextCommentSameUser ? { paddingBottom: 1 } : undefined,
        ]}>
        {!isPreviousCommentSameUser && <Avatar user={createdBy} />}
        <View style={[styles.bubble, isOwner ? undefined : styles.bubbleReply]}>
          {!isPreviousCommentSameUser && (
            <Text style={styles.username}>{createdBy.username}</Text>
          )}
          <Text>{text}</Text>
        </View>
      </View>
    </LongPressGestureHandler>
  );
};

export default Comment;
