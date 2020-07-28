/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useCallback, useEffect } from 'react'

import { useFocusEffect, useRoute } from '@react-navigation/native'

import { StyleSheet, Text, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_CHEERS, FETCH_POST_CHEERS } from '../redux/actions/types'
import { fetchPostCheersAction } from '../redux/actions/post'

import UsersList from '../components/UsersList'
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

const ListEmptyComponent = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>No 🍻 yet!</Text>
  </View>
)

const PostCheers = () => {
  const dispatch = useDispatch()

  const route = useRoute()

  const postId = route.params?.postId

  const authUser = useSelector((state) => state.auth.user)

  const isLoading = useSelector((state) => state.ui.isLoading)

  const cheers = useSelector((state) => state.post.cheers)

  const users = cheers.map((cheer) => cheer.createdBy)

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
        <UsersList users={users} ListEmptyComponent={ListEmptyComponent} />
      </ScreenLoader>
    </View>
  )
}

export default PostCheers
