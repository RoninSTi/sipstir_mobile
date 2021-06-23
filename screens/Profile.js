/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'

import { RefreshControl, SectionList, StyleSheet, Text, View } from 'react-native'
import { List, Switch } from 'react-native-paper'
import { ATTEMPT_LOGOUT, REFRESH_USER } from '../redux/actions/types'

import ProfileHeader from '../components/ProfileHeader'
import { updateUserAction } from '../redux/actions/user'

const VERSION = '1.0.19'

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

  const authUser = useSelector((state) => state.auth.user)

  const isRefreshing = useSelector((state) => state.user.isRefreshing)

  const hideReported = useSelector((state) => state.auth.user.settings?.hideReported)

  const [localHideReported, setLocalHideReported] = useState(hideReported)

  const { navigate } = navigation

  const hideReportedPosts = () => {
    setLocalHideReported((prev) => {
      dispatch(
        updateUserAction({
          userId: authUser.id,
          token: authUser.token,
          settings: {
            hideReported: !prev,
          },
        })
      )

      return !prev
    })
  }

  const DATA = [
    {
      key: 'button-section',
      name: 'buttons',
      data: [
        {
          onPress: () => navigate('ActivityScreen'),
          title: 'Activity',
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
          onPress: () => navigate('Following'),
          title: 'Following',
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
          onPress: () => navigate('Followers'),
          title: 'Followers',
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
          onPress: () => navigate('Blocked'),
          title: 'Blocked',
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
          title: 'My Posts',
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
          onPress: () => navigate('RewardRedemptionsScreen'),
          title: 'Reward Redemptions',
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
      key: 'settings-section',
      name: 'settings',
      data: [
        {
          onPress: () => hideReportedPosts(),
          title: 'Hide posts reported by others',
          type: 'button',
          right: (props) => (
            <Switch {...props} value={localHideReported} onValueChange={hideReportedPosts} />
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

  const onRefresh = () => {
    dispatch({ type: REFRESH_USER })
  }

  return (
    <View style={styles.container}>
      <SectionList
        ListHeaderComponent={<ProfileHeader />}
        // eslint-disable-next-line react/prop-types
        keyExtractor={(item, index) => `${item.name}-${index}`}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor="#5177FF" />
        }
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
