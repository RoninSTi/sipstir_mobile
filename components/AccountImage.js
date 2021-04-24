import React from 'react'
import PropTypes from 'prop-types'

import { Image, ViewPropTypes } from 'react-native'

import GooglePlaceImage from './GooglePlaceImage'

const AccountImage = ({ account, containerStyle, height, width }) => {
  const { image, location } = account

  const { photo } = location

  return image ? (
    <Image
      source={{ uri: `${image}?w=${width}&h=${height}&fit=crop` }}
      style={[containerStyle, { height, width }]}
    />
  ) : (
    <GooglePlaceImage
      height={height}
      image={photo}
      containerStyle={[{ height, width }, containerStyle]}
    />
  )
}

AccountImage.defaultProps = {
  containerStyle: {},
  height: 100,
  width: 100,
}

AccountImage.propTypes = {
  account: PropTypes.shape({
    image: PropTypes.string,
    location: PropTypes.shape({
      photo: PropTypes.shape({}),
    }),
  }).isRequired,
  containerStyle: ViewPropTypes.style,
  height: PropTypes.number,
  width: PropTypes.number,
}

export default AccountImage
