import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
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

  const onPress = () => {
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

  return (
    <Button
      color="#FFFFFF"
      icon={() => <Icon color="#FFF" name="plus" size={24} />}
      loading={loading}
      onPress={onPress}
      uppercase={false}
    />
  )
}

export default PostButton
