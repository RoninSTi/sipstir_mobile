/* eslint-disable global-require */
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { StyleSheet, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'

import PostList from '../components/PostList'
import ScreenLoader from '../components/ScreenLoader'

import { FETCH_FEED } from '../redux/actions/types'
import { fetchFeedAction } from '../redux/actions/feed'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
})

const LocationFeedScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const route = useRoute()

  const locationId = route.params?.locationId

  const locationName = route.params?.locationName

  const user = useSelector((state) => state.auth.user)

  useLayoutEffect(() => {
    navigation.setOptions({ title: `Posts from ${locationName}` })
  }, [locationName, navigation])

  useEffect(() => {
    if (locationId) {
      dispatch(
        fetchFeedAction({ feedType: 'location', token: user?.token, userId: user?.id, locationId })
      )
    }
  }, [dispatch, locationId, user])

  const isLoading = useSelector((state) => state.ui.isLoading)

  const posts = useSelector((state) => state.feed.posts.location)

  const postListRef = useRef(null)

  const loading = isLoading.some((item) => item.loadingType === FETCH_FEED)

  return (
    <View style={styles.container}>
      <ScreenLoader loading={loading}>
        <PostList detailPath="LocationFeedDetail" posts={posts} ref={postListRef} />
      </ScreenLoader>
    </View>
  )
}

LocationFeedScreen.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
  }).isRequired,
}

export default LocationFeedScreen
