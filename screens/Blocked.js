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

const Following = () => {
  const users = useSelector((state) => state.blocked.blockedUsers)

  return (
    <View style={styles.container}>
      <UsersList users={users || []} ListEmptyComponent={() => <ListEmptyComponent />} />
    </View>
  )
}

export default Following
