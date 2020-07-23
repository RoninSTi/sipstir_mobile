/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'

import { SectionList, StyleSheet, Text, View } from 'react-native'
import { List } from 'react-native-paper'
import { ATTEMPT_LOGOUT } from '../redux/actions/types'

import ProfileHeader from '../components/ProfileHeader'

const VERSION = '1.2.8'

const styles = StyleSheet.create({
  activityContainer: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#E6E6EB',
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    borderBottomWidth: 1,
  },
  title: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  titleDestructive: {
    color: '#E2434D',
    textAlign: 'center',
  },
  version: {
    color: '#C8C8C8',
    fontSize: 10,
    position: 'absolute',
    top: 14,
    right: 14,
  },
})

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const { navigate } = navigation

  const DATA = [
    {
      key: 'button-section',
      name: 'buttons',
      data: [
        {
          title: 'Awards',
          type: 'button',
          right: (props) => (
            <List.Icon
              {...props}
              color="#000000"
              icon="chevron-right"
              style={{ marginHorizontal: 0, height: 24 }}
            />
          ),
        },
        {
          onPress: () => navigate('MyFeedScreen'),
          title: 'My BarSnaps',
          type: 'button',
          right: (props) => (
            <List.Icon
              {...props}
              color="#000000"
              icon="chevron-right"
              style={{ marginHorizontal: 0, height: 24 }}
            />
          ),
        },
      ],
    },
    {
      key: 'danger-section',
      name: 'logout',
      data: [
        {
          title: 'Log Out',
          type: 'destructive-button',
          onPress: () => {
            dispatch({ type: ATTEMPT_LOGOUT })
          },
        },
      ],
    },
  ]

  const renderItem = ({ item }) => {
    return (
      <List.Item
        onPress={item.onPress}
        right={item.right}
        style={styles.item}
        title={item.title}
        titleStyle={[
          styles.title,
          item.type === 'destructive-button' ? styles.titleDestructive : undefined,
        ]}
      />
    )
  }

  renderItem.propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string,
      onPress: PropTypes.func,
      right: PropTypes.node,
      title: PropTypes.string,
      type: PropTypes.string,
    }).isRequired,
  }

  return (
    <View style={styles.container}>
      <SectionList
        ListHeaderComponent={<ProfileHeader />}
        // eslint-disable-next-line react/prop-types
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={renderItem}
        sections={DATA}
        SectionSeparatorComponent={() => <View style={{ height: 14 }} />}
      />
      <Text style={styles.version}>{`v: ${VERSION}`}</Text>
    </View>
  )
}

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
}

export default ProfileScreen
