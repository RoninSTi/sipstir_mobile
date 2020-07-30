/* eslint-disable global-require */
import React, { useEffect, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import { RefreshControl } from 'react-native'
import { Portal } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useRoute } from '@react-navigation/native'

import { useDispatch, useSelector } from 'react-redux'
import { fetchSinglePostAction } from '../redux/actions/post'
import { REFRESH_DETAIL } from '../redux/actions/types'

import GuessList from '../components/GuessList'
import PointsModal from '../components/PointsModal'
import Post from '../components/Post'

const PostDetail = ({ navigation }) => {
  const dispatch = useDispatch()

  const route = useRoute()

  const postId = route.params?.postId

  const showPointsModal = route.params?.showPointsModal

  const post = useSelector((state) =>
    state.feed.posts[state.feed.feedType].find((p) => p.id === postId)
  )

  const authUser = useSelector((state) => state.auth.user)

  const isRefreshingDetail = useSelector((state) => state.post.isRefreshingDetail)

  useEffect(() => {
    if (postId && !post) {
      dispatch(fetchSinglePostAction({ postId, token: authUser.token, userId: authUser.id }))
    }
  }, [dispatch, post, postId])

  useLayoutEffect(() => {
    if (post) {
      navigation.setOptions({ title: `${post?.createdBy.username}'s BarSnap` })
    }
  }, [navigation, post])

  if (!post) return null

  const handleOnRefresh = () => {
    dispatch({ type: REFRESH_DETAIL, payload: postId })
  }

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={-40}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl
          refreshing={isRefreshingDetail}
          onRefresh={handleOnRefresh}
          tintColor="#5177FF"
        />
      }
      style={{ backgroundColor: '#E8E8E8' }}>
      <Post isDetail post={post} />
      <GuessList guesses={post.guesses} />
      <Portal>
        <PointsModal isVisible={showPointsModal} post={post} />
      </Portal>
    </KeyboardAwareScrollView>
  )
}

PostDetail.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
  }).isRequired,
}

export default PostDetail
