/* eslint-disable global-require */
import React, { useCallback, useEffect } from 'react'

import { useFocusEffect, useRoute } from '@react-navigation/native'

import { StyleSheet, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_CHEERS, FETCH_POST_CHEERS } from '../redux/actions/types'
import { fetchPostCheersAction } from '../redux/actions/post'

// import BackgroundHeader from '@components/BackgroundHeader';
import PostCheersList from '../components/PostCheersList'
import ScreenLoader from '../components/ScreenLoader'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

const PostCheers = () => {
  const dispatch = useDispatch()

  const route = useRoute()

  const postId = route.params?.postId

  const authUser = useSelector((state) => state.auth.user)

  const isLoading = useSelector((state) => state.ui.isLoading)

  const cheers = useSelector((state) => state.post.cheers)

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostCheersAction({ postId, token: authUser.token }))
    }
  }, [dispatch, postId])

  useFocusEffect(
    useCallback(() => {
      return () => dispatch({ type: CLEAR_CHEERS })
    }, [dispatch])
  )

  const isLoadingCheers = isLoading.some(
    (item) => item.loadingType === FETCH_POST_CHEERS && item.meta === postId
  )

  return (
    <View style={styles.container}>
      <ScreenLoader loading={isLoadingCheers}>
        <PostCheersList cheers={cheers} />
      </ScreenLoader>
    </View>
  )
}

PostCheers.navigationOptions = {
  // headerBackground: () => <BackgroundHeader />,
  headerStyle: {
    backgroundColor: 'rgba(231, 73, 62, 0.98)',
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerTintColor: '#FFFFFF',
  title: 'Cheers',
}

export default PostCheers
