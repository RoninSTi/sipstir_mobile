import React from 'react'

import { Dimensions, Image, StyleSheet, View, Text } from 'react-native'

import { useRoute } from '@react-navigation/native'

import { useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import GooglePlaceImage from '../components/GooglePlaceImage'

const { width: WIDTH } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    padding: 28,
  },
  image: {
    width: WIDTH,
    height: WIDTH,
  },
})

const RewardDetail = () => {
  const route = useRoute()

  const rewardId = route.params?.rewardId

  const reward = useSelector((state) => state.rewards.rewards.find((r) => r.id === rewardId))

  const user = useSelector((state) => state.user)

  if (!reward) return null

  const buttonDisabled = reward.points > user.pointsBalance

  return (
    <View>
      {reward.account.image ? (
        <Image
          source={{ uri: `${reward.account.image}?w=${WIDTH}&h=${WIDTH}&fit=crop` }}
          style={styles.image}
        />
      ) : (
        <GooglePlaceImage containerStyle={styles.image} photo={reward.account.location.photo} />
      )}
      <View style={styles.container}>
        <Text>{reward.account.name}</Text>
        <Text>{reward.account.location.vicinity}</Text>
        <Text>{reward.title}</Text>
        <Text>{reward.message}</Text>
        <Button
          disabled={buttonDisabled}
          mode="contained">{`Redeem for ${reward.points} points`}</Button>
      </View>
    </View>
  )
}

export default RewardDetail
