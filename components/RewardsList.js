import React from 'react'
import PropTypes from 'prop-types'

import { FlatList } from 'react-native'

import { useSelector } from 'react-redux'
import { FETCH_REWARDS } from '../redux/actions/types'

import ScreenLoader from './ScreenLoader'
import RewardsItem from './RewardsItem'

const RewardsList = ({ rewards: data }) => {
  const isLoading = useSelector((state) => state.ui.isLoading)

  const loading = isLoading.some((item) => item.loadingType === FETCH_REWARDS)

  const keyExtractor = (item) => `${item.id}`

  // eslint-disable-next-line react/prop-types
  const renderItem = ({ item: reward }) => <RewardsItem reward={reward} />

  return (
    <ScreenLoader loading={loading}>
      <FlatList
        data={data}
        keyboardShouldPersistTaps="always"
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={{ backgroundColor: '#F9F9F9' }}
      />
    </ScreenLoader>
  )
}

RewardsList.propTypes = {
  rewards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default RewardsList
