/* eslint-disable global-require */
import React, { useRef } from 'react'

import { StyleSheet, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import PostList from '../components/PostList'
import { REFRESH_MY_FEED } from '../redux/actions/types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  overlay: {
    backgroundColor: '#000000',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})

const MyFeedScreen = () => {
  const dispatch = useDispatch()

  const isRefreshing = useSelector((state) => state.myPosts.isRefreshing)

  const posts = useSelector((state) => state.myPosts.posts)

  const postListRef = useRef(null)

  const onRefresh = () => dispatch({ type: REFRESH_MY_FEED })

  return (
    <View style={styles.container}>
      <PostList
        detailPath="MyFeedDetail"
        onRefresh={onRefresh}
        posts={posts}
        ref={postListRef}
        refreshing={isRefreshing}
      />
    </View>
  )
}

export default MyFeedScreen
