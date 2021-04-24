/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'

import { StyleSheet, Text, View } from 'react-native'

import { useSelector } from 'react-redux'

import UsersList from '../components/UsersList'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

const ListEmptyComponent = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>No 💁‍♂️💁‍♀️ yet!</Text>
  </View>
)

const Followers = () => {
  const users = useSelector((state) => {
    return state.user?.followers
  })

  return (
    <View style={styles.container}>
      <UsersList users={users || []} ListEmptyComponent={() => <ListEmptyComponent />} />
    </View>
  )
}

export default Followers
