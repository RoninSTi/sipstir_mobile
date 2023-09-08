/* eslint-disable global-require */
import React, { useRef } from 'react'

import { Animated, StyleSheet, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import BackgroundHeader from '../components/BackgroundHeader'
import FeedSelector from '../components/FeedSelector'
import HeaderTitle from '../components/HeaderTitle'
import PostList from '../components/PostList'
import ScreenLoader from '../components/ScreenLoader'

import { FETCH_FEED, REFRESH_FEED } from '../redux/actions/types'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6EB',
    flex: 1,
  },
})

const FeedScreen = () => {
  const dispatch = useDispatch()

  const offsetRef = useRef(new Animated.Value(0)).current

  const isLoading = useSelector((state) => state.ui.isLoading)

  const isRefreshing = useSelector((state) => state.feed.isRefreshing)

  const posts = useSelector((state) => state.feed.posts[state.feed.feedType])

  const onRefresh = () => {
    dispatch({ type: REFRESH_FEED })
  }

  const isLoadingFeed =
    isLoading.some((item) => item.loadingType === FETCH_FEED) && !isRefreshing && posts.length === 0

  const handleOnScroll = () => {
    Animated.event(
      [
        {
          nativeEvent: { contentOffset: { y: offsetRef } },
        },
      ],
      { useNativeDriver: true } // <-- Add this
    )
  }

  return (
    <View style={styles.container}>
      <FeedSelector offsetY={offsetRef} />
      <ScreenLoader loading={isLoadingFeed}>
        <PostList
          detailPath="Detail"
          onRefresh={onRefresh}
          onScroll={handleOnScroll}
          posts={posts}
          refreshing={isRefreshing}
        />
      </ScreenLoader>
    </View>
  )
}

FeedScreen.navigationOptions = () => ({
  headerBackground: () => <BackgroundHeader />,
  headerBackTitle: null,
  headerStyle: {
    backgroundColor: 'rgba(231, 73, 62, 0.98)',
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerTitle: () => <HeaderTitle />,
})

export default FeedScreen
