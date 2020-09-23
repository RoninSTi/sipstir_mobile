import React, { useEffect, useState } from 'react'

import { View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import KeyboardSpacer from 'react-native-keyboard-spacer'

import CaptionInput from '../components/CaptionInput'
import RewardsList from '../components/RewardsList'
import { fetchRewardsAction } from '../redux/actions/rewards'

const Rewards = () => {
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    setSearchString('')
  }, [])

  const dispatch = useDispatch()

  const rewards = useSelector((state) => state.rewards.rewards)

  const token = useSelector((state) => state.auth.user?.token)

  const handleOnChangeText = (search) => {
    setSearchString(search)

    dispatch(fetchRewardsAction({ search, token }))
  }

  return (
    <View style={{ flex: 1 }}>
      <RewardsList rewards={rewards} />
      <CaptionInput
        autoFocus
        backgroundColor="#F3EBEA"
        hideButton
        onChangeText={handleOnChangeText}
        placeholder="Search for a reward..."
        value={searchString}
      />
      <KeyboardSpacer topSpacing={-70} />
    </View>
  )
}

export default Rewards
