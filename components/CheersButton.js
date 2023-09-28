/* eslint-disable global-require */
import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import { Image, StyleSheet } from 'react-native'

import { CHEERS_POST } from '../redux/actions/types'
import { cheersPostAction } from '../redux/actions/post'

const styles = StyleSheet.create({
  button: {
    padding: 0,
    borderRadius: 20,
  },
  label: {
    fontSize: 12,
  },
})

const CheersButton = ({ post }) => {
  const dispatch = useDispatch()

  const authUser = useSelector((state) => state.auth.user)

  const isLoading = useSelector((state) => state.ui.isLoading)

  const { id, isCheered } = post

  const isLoadingCheers = isLoading.some(
    (item) => item.loadingType === CHEERS_POST && item.meta === post.id
  )

  const handleOnPress = () => {
    if (isLoadingCheers) return

    dispatch(cheersPostAction({ createdById: authUser?.id, postId: id, token: authUser?.token }))
  }

  return (
    <Button
      textColor="#676767"
      compact
      icon={() => (
        <Image
          source={require('../assets/images/icon_cheers_dark.png')}
          style={{
            width: 20,
            height: 16,
            tintColor: isCheered ? '#5177FF' : '#676767',
          }}
        />
      )}
      labelStyle={[styles.label, { paddingLeft: isLoadingCheers ? 16 : 8 }]}
      loading={isLoadingCheers}
      onPress={handleOnPress}
      style={styles.button}
      uppercase={false}>
      Cheers!
    </Button>
  )
}

CheersButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    isCheered: PropTypes.bool,
  }).isRequired,
}

export default CheersButton
