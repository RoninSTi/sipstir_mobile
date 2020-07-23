import React from 'react'

import { useSelector } from 'react-redux'

import { StyleSheet, View, ViewPropTypes } from 'react-native'
import { Avatar } from 'react-native-paper'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: '#C4C4C4',
    borderRadius: 80 / 2,
    borderWidth: 5,
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
})

const LeaderboardHeaderAvatar = ({ containerStyle }) => {
  const avatar = useSelector((state) => state.user?.avatar)

  return (
    <View style={[styles.container, containerStyle]}>
      {avatar && <Avatar.Image size={75} source={{ uri: avatar }} />}
    </View>
  )
}

LeaderboardHeaderAvatar.defaultProps = {
  containerStyle: {},
}

LeaderboardHeaderAvatar.propTypes = {
  containerStyle: ViewPropTypes.style,
}

export default LeaderboardHeaderAvatar
