import React from 'react';
import PropTypes from 'prop-types';

import { Dimensions, StyleSheet, View } from 'react-native';

import Comment from './Comment';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    width: width - 2 * 28,
  },
});

const CommentList = ({ guess }) => {
  const { comments } = guess;

  return (
    <View style={styles.container}>
      {comments.map((comment, index) => {
        const isOwner = comment.createdById === guess.createdById;

        const isPreviousCommentSameUser = () => {
          if (index - 1 > -1) {
            return comments[index - 1].createdById === comment.createdById;
          }

          return false;
        };

        const isNextCommentSameUser = () => {
          if (index + 1 < comments.length) {
            return comments[index + 1].createdById === comment.createdById;
          }

          return false;
        };

        return (
          <Comment
            isOwner={isOwner}
            isPreviousCommentSameUser={isPreviousCommentSameUser()}
            isNextCommentSameUser={isNextCommentSameUser()}
            key={`commentList-${comment.id}`}
            comment={comment}
          />
        );
      })}
    </View>
  );
};

CommentList.propTypes = {
  guess: PropTypes.shape({
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        createdById: PropTypes.number,
      })
    ),
    createdById: PropTypes.number,
  }).isRequired,
};

export default CommentList;
