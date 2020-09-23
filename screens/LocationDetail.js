/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable global-require */
import React, { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import { useRoute } from '@react-navigation/native'

import LocationDetail from '../components/LocationDetail'

const LocationDetailScreen = ({ navigation }) => {
  const route = useRoute()

  const location = route.params?.location

  useLayoutEffect(() => {
    navigation.setOptions({ title: location.name })
  }, [location, navigation])

  if (!location) return null

  return <LocationDetail location={location} />
}

LocationDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
  }).isRequired,
}

export default LocationDetailScreen
