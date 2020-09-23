/* eslint-disable global-require */
import React from 'react'

import { StyleSheet, View, Text } from 'react-native'

import { useSelector } from 'react-redux'

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 28,
  },
  container: {
    padding: 14,
  },
  message: {
    color: '#65615E',
    fontSize: 14,
    textAlign: 'center',
  },
  title: {
    color: '#65615E',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
})

const RewardDetail = () => {
  const user = useSelector((state) => state.user)

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Reward redeemed, cheers!</Text>
        <Text style={styles.message}>{`You now have ${user.pointsBalance} point${
          user.pointsBalance === 1 ? '' : 's'
        }`}</Text>
      </View>
    </View>
  )
}

export default RewardDetail
