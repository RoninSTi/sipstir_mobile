import React from 'react'
import PropTypes from 'prop-types'

import { useNavigation } from '@react-navigation/native'

import { IconButton } from 'react-native-paper'

const CancelButton = ({ onPress }) => {
  const { dangerouslyGetParent } = useNavigation()

  const handleOnPress = () => {
    if (onPress) onPress()

    dangerouslyGetParent()?.goBack()
  }

  return <IconButton color="#FFFFFF" icon="window-close" size={24} onPress={handleOnPress} />
}

CancelButton.defaultProps = {
  onPress: () => {},
}

CancelButton.propTypes = {
  onPress: PropTypes.func,
}

export default CancelButton
