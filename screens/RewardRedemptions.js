import React from 'react'

import { View } from 'react-native'

import { useSelector } from 'react-redux'
import RedemptionList from '../components/RedemptionList'

const RewardRedemptions = () => {
  const redemptions = useSelector((state) => state.rewards.redemptions)

  return (
    <View>
      <RedemptionList redemptions={redemptions} />
    </View>
  )
}

export default RewardRedemptions
