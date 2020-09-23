import React from 'react'
import PropTypes from 'prop-types'

import { FlatList } from 'react-native'

import { useSelector } from 'react-redux'
import { FETCH_REDEMPTIONS } from '../redux/actions/types'

import ScreenLoader from './ScreenLoader'
import RedemptionItem from './RedemptionItem'

const RedemptionList = ({ redemptions: data }) => {
  const isLoading = useSelector((state) => state.ui.isLoading)

  const loading = isLoading.some((item) => item.loadingType === FETCH_REDEMPTIONS)

  const keyExtractor = (item) => `${item.id}`

  // eslint-disable-next-line react/prop-types
  const renderItem = ({ item: redemption }) => <RedemptionItem redemption={redemption} />

  return (
    <ScreenLoader loading={loading}>
      <FlatList
        data={data}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={{ backgroundColor: '#F9F9F9' }}
      />
    </ScreenLoader>
  )
}

RedemptionList.propTypes = {
  redemptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default RedemptionList
