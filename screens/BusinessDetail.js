import React, { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import { useRoute } from '@react-navigation/native'

import BusinessDetail from '../components/BusinessDetail'

const BusinessDetailScreen = ({ navigation }) => {
  const route = useRoute()

  const reward = route.params?.reward

  const { account } = reward

  useLayoutEffect(() => {
    navigation.setOptions({ title: account.name })
  }, [account, navigation])

  return <BusinessDetail reward={reward} />
}

BusinessDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
  }).isRequired,
}

export default BusinessDetailScreen
