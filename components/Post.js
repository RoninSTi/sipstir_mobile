/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { useActionSheet } from '@expo/react-native-action-sheet';

import { useDispatch, useSelector } from 'react-redux'

import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FeedPostFooter from './FeedPostFooter';
import FeedPostHeader from './FeedPostHeader';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width - 2 * 14;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
  },
  image: {
    overflow: 'hidden',
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
  },
  imageDetail: {
    width,
    height: width,
  },
  revealedBubble: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    position: 'absolute',
    bottom: 14,
    left: 14,
    right: 14,
  },
  zoom: {
    position: 'absolute',
    right: 14,
    top: 14,
  },
});

const Post = ({ detailPath, isDetail, post }) => {
  const user = useSelector(state => state.user)

  const { navigate } = useNavigation();

  const { image } = post;

  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = () => {
    const isOwner = post.createdById === user.id;

    const navigateToDetail = isOwner || post.isGuessed || post.revealed;

    if (navigateToDetail) {
      navigate(detailPath, {
        postId: post.id,
        username: post.createdBy.username,
      });
    } else {
      navigate('Guess', { username: post.createdBy.username });
    }
  };

  const handleDeletePost = () => {
    // deletePost(post.id);
  };

  const openActionSheet = () => {
    const options = ['Delete Post', 'Cancel'];
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
            handleDeletePost();
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

  const onPressZoom = () => {
    navigate('ZoomedImageScreen', {
      remoteUri: image,
    });
  };

  return (
    <LongPressGestureHandler onHandlerStateChange={onHandlerStateChange}>
      <View style={styles.container}>
        <TouchableWithoutFeedback disabled={isDetail} onPress={onPress}>
          <View>
            <View styles={styles.imageContainer}>
              <Image style={isDetail ? styles.imageDetail : styles.image} source={{ uri: image }} />
              {post.revealed && (
                <View style={styles.revealedBubble}>
                  <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Revealed 🎉</Text>
                  <Text style={{ color: '#FFFFFF' }}>
                    <Text style={{ fontWeight: '700' }}>{post.guessesCorrect || 0}</Text> correct 👍
                    {'  '}
                    <Text style={{ fontWeight: '700' }}>{post.guessesWrong || 0}</Text> Wrong 👎
                  </Text>
                </View>
              )}
            </View>
            <FeedPostFooter post={post} />
            <FeedPostHeader post={post} />
            {Platform.OS === 'ios' && (
              <TouchableOpacity onPress={onPressZoom} style={styles.zoom}>
                <Icon color="#D8D8D8" name="magnify" size={30} />
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </LongPressGestureHandler>
  );
};

Post.defaultProps = {
  isDetail: false,
};

export default Post;
