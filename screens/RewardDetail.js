/* eslint-disable global-require */
import React, { useLayoutEffect } from 'react'

import { StyleSheet, View, Text } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'

import { useDispatch, useSelector } from 'react-redux'

import { redeemRewardAction } from '../redux/actions/rewards'

import BackgroundButton from '../components/BackgroundButton'
import { REDEEM_REWARD } from '../redux/actions/types'

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 28,
  },
  container: {
    padding: 14,
  },
  message: {
    color: '#65615E',
    fontSize: 14,
    marginBottom: 28,
    textAlign: 'center',
  },
  points: {
    color: '#928C88',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 28,
    textAlign: 'center',
  },
  showText: {
    color: '#AE9E9C',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 14,
    textAlign: 'center',
  },
  title: {
    color: '#65615E',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
})

const RewardDetail = () => {
  const dispatch = useDispatch()

  const route = useRoute()

  const navigation = useNavigation()

  const reward = route.params?.reward

  useLayoutEffect(() => {
    navigation.setOptions({ title: reward.account.name })
  }, [reward, navigation])

  const user = useSelector((state) => state.user)

  const token = useSelector((state) => state.auth.user?.token)

  const isLoading = useSelector((state) =>
    state.ui.isLoading.some((element) => element.loadingType === REDEEM_REWARD)
  )

  const buttonDisabled = reward.points > user.pointsBalance

  const onPressRedeem = () => {
    dispatch(redeemRewardAction({ rewardId: reward.id, token }))
  }

  const redeemedBalance = user.pointsBalance - reward.points

  return (
    <View style={styles.container}>
      <Text style={styles.showText}>Show this to your server and tap redeem</Text>
      <View style={styles.card}>
        <Text style={styles.title}>{reward.title}</Text>
        <Text style={styles.message}>{reward.message}</Text>
        <BackgroundButton
          disabled={buttonDisabled}
          isLoading={isLoading}
          onPress={onPressRedeem}
          source={require('../assets/images/button_background.png')}
          title={`Redeem for ${reward.points} point${reward.points === 1 ? '' : 's'}`}
        />
        {!buttonDisabled && (
          <Text style={styles.points}>{`You will have ${redeemedBalance} point${
            redeemedBalance === 1 ? '' : 's'
          } after redeeming`}</Text>
        )}
      </View>
    </View>
  )
}

export default RewardDetail
