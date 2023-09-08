/* eslint-disable global-require */
import React from 'react'

import { StyleSheet, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import PostList from '../components/PostList'
import ScreenLoader from '../components/ScreenLoader'

import { REFRESH_MY_FEED, FETCH_FEED } from '../redux/actions/types'

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

  const isLoading = useSelector((state) => state.ui.isLoading)

  const isRefreshing = useSelector((state) => state.myPosts.isRefreshing)

  const posts = useSelector((state) => state.myPosts.posts)

  const onRefresh = () => dispatch({ type: REFRESH_MY_FEED })

  const loading = isLoading.some((item) => item.loadingType === FETCH_FEED) && !isRefreshing

  return (
    <View style={styles.container}>
      <ScreenLoader loading={loading}>
        <PostList
          detailPath="MyFeedDetail"
          onRefresh={onRefresh}
          posts={posts}
          refreshing={isRefreshing}
        />
      </ScreenLoader>
    </View>
  )
}

export default MyFeedScreen
