/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useNavigation } from '@react-navigation/native'

import { useActionSheet } from '@expo/react-native-action-sheet'

import { useDispatch, useSelector } from 'react-redux'

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Menu } from 'react-native-paper'
import { LongPressGestureHandler, State } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { deletePostAction, reportPostAction } from '../redux/actions/post'
import { ATTEMPT_GUESS } from '../redux/actions/types'

import FeedPostFooter from './FeedPostFooter'
import FeedPostHeader from './FeedPostHeader'

const { width } = Dimensions.get('window')
const IMAGE_WIDTH = width - 2 * 14

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
})

const Post = ({ detailPath, isDetail, post }) => {
  const dispatch = useDispatch()

  const [menuIsVisible, setMenuIsVisible] = useState(false)

  const token = useSelector((state) => state.auth.user?.token)

  const user = useSelector((state) => state.user)

  const { navigate } = useNavigation()

  const { image } = post

  const { showActionSheetWithOptions } = useActionSheet()

  const isOwner = post.createdById === user.id

  const onPress = () => {
    const navigateToDetail = isOwner || post.isGuessed || post.revealed

    const params = {
      postId: post.id,
      showPointsModal: false,
    }

    if (navigateToDetail) {
      navigate(detailPath, params)
    } else {
      dispatch({ type: ATTEMPT_GUESS, payload: params })
    }
  }

  const handleOnPressDelete = () => {
    dispatch(deletePostAction({ postId: post.id, token }))
  }

  const handleOnDismissMenu = () => {
    setMenuIsVisible(false)
  }

  const handleOnPressMenu = () => {
    setMenuIsVisible(true)
  }

  const handleOnPressReportPost = () => {
    setMenuIsVisible(false)

    dispatch(reportPostAction({ postId: post.id, token }))
  }

  const openActionSheet = () => {
    const options = ['Delete Post', 'Cancel']
    const cancelButtonIndex = 1

    const title = 'Admin Menu'
    const message = 'Admin actions you can take'

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
            handleOnPressDelete()
            break
          default:
            break
        }
      }
    )
  }

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (user.role === 'admin') {
        openActionSheet()
      }
    }
  }

  const onPressZoom = () => {
    navigate('Zoom', {
      url: image,
    })
  }

  return (
    <LongPressGestureHandler onHandlerStateChange={onHandlerStateChange}>
      <View style={styles.container}>
        <TouchableWithoutFeedback disabled={isDetail} onPress={onPress}>
          <View style={{ position: 'relative' }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={onPressZoom}
              styles={styles.imageContainer}>
              <>
                <Image
                  style={isDetail ? styles.imageDetail : styles.image}
                  source={{ uri: image }}
                />
                {post.revealed && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={isDetail}
                    onPress={onPress}
                    style={styles.revealedBubble}>
                    <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Revealed 🎉</Text>
                    <Text style={{ color: '#FFFFFF' }}>
                      <Text style={{ fontWeight: '700' }}>{post.guessesCorrect || 0}</Text> correct
                      👍
                      {'  '}
                      <Text style={{ fontWeight: '700' }}>{post.guessesWrong || 0}</Text> Wrong 👎
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            </TouchableOpacity>
            <FeedPostFooter isDetail={isDetail} detailPath={detailPath} post={post} />
            <FeedPostHeader post={post} />
            <View style={styles.zoom}>
              <Menu
                visible={menuIsVisible}
                onDismiss={handleOnDismissMenu}
                anchor={
                  <TouchableOpacity onPress={handleOnPressMenu}>
                    <Icon color="#D8D8D8" name="dots-vertical" size={30} />
                  </TouchableOpacity>
                }>
                <Menu.Item onPress={handleOnPressReportPost} title="Report post as offensive" />
                {isOwner && <Menu.Item onPress={handleOnPressDelete} title="Delete post" />}
              </Menu>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </LongPressGestureHandler>
  )
}

Post.defaultProps = {
  detailPath: 'Detail',
  isDetail: false,
}

Post.propTypes = {
  detailPath: PropTypes.string,
  isDetail: PropTypes.bool,
  post: PropTypes.shape({
    createdById: PropTypes.number,
    createdBy: PropTypes.shape({
      username: PropTypes.string,
    }),
    guessesCorrect: PropTypes.number,
    guessesWrong: PropTypes.number,
    id: PropTypes.number,
    image: PropTypes.string,
    isGuessed: PropTypes.bool,
    revealed: PropTypes.bool,
  }).isRequired,
}

export default Post
