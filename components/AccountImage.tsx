import React from 'react'

import { Image } from 'react-native'

import GooglePlaceImage from './GooglePlaceImage'
import { Account } from '../types'

type Props = {
  account: Account;
  containerStyle: object;
  height: number;
  width: number;
}

const AccountImage: React.FC<Props> = ({ account, containerStyle = {}, height = 100, width = 100 }) => {
  const { image, location: {photo} } = account

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

export default AccountImage
