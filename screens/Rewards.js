import React from 'react'

import { View } from 'react-native'

import { useSelector } from 'react-redux'

import RewardsList from '../components/RewardsList'

const Rewards = () => {
  const rewards = useSelector((state) => state.rewards.rewards)
  return (
    <View>
      <RewardsList rewards={rewards} />
    </View>
  )
}

export default Rewards
