import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { ActivityIndicator, IconButton } from 'react-native-paper'
import { createPostAction } from '../redux/actions/post'
import { CREATE_POST } from '../redux/actions/types'

const PostButton = () => {
  const dispatch = useDispatch()

  const isLoading = useSelector((state) => state.ui.isLoading)

  const authUser = useSelector((state) => state.auth.user)

  const caption = useSelector((state) => state.createPost.caption)

  const image = useSelector((state) => state.createPost.image)

  const location = useSelector((state) => state.createPost.location)

  const loading = isLoading.some((item) => item.loadingType === CREATE_POST)

  const allowPost = useSelector((state) => !!(state.createPost.location && state.createPost.image))

  const handleOnPress = () => {
    if (loading || !allowPost) return

    dispatch(
      createPostAction({
        createdById: authUser.id,
        caption,
        image,
        locationId: location.id,
        token: authUser.token,
      })
    )
  }

  return loading ? (
    <ActivityIndicator color="#FFFFFF" size={24} style={{ marginRight: 10 }} />
  ) : (
    <IconButton iconColor="#FFFFFF" icon="plus" size={24} onPress={handleOnPress} />
  )
}

export default PostButton
