import React from 'react'
import PropTypes from 'prop-types'

import { useNavigation } from '@react-navigation/native'

import { Button } from 'react-native-paper'

const CancelButton = ({ onPress, title }) => {
  const { dangerouslyGetParent } = useNavigation()

  const handleOnPress = () => {
    if (onPress) onPress()

    dangerouslyGetParent()?.goBack()
  }

  return (
    <Button
      color="#FFFFFF"
      labelStyle={{ fontSize: 18, letterSpacing: 0 }}
      onPress={handleOnPress}
      uppercase={false}>
      {title}
    </Button>
  )
}

CancelButton.defaultProps = {
  onPress: () => {},
  title: 'Cancel',
}

CancelButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
}

export default CancelButton
