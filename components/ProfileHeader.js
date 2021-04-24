/* eslint-disable no-undef */
/* eslint-disable global-require */
import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Image, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator, Avatar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { updateUserAction } from '../redux/actions/user'

import AlltimeLeaderboardPosition from './AlltimeLeaderboardPosition'
import PhotoUploader from './PhotoUploader'

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
  avatarContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 75,
    height: 150,
    justifyContent: 'center',
    shadowColor: '#BCBCCA',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 30,
    width: 150,
  },
  avatar: {
    overflow: 'hidden',
    borderRadius: 73,
    height: 146,
    width: 146,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5177FF',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    bottom: 14,
    height: 30,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    width: 30,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 28,
  },
  positionContainer: {
    alignItems: 'center',
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    borderTopWidth: 1,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
    paddingTop: 28,
    width: '100%',
  },
  statsContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginTop: 28,
  },
  statContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    color: '#CACACA',
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.5,
  },
  statTitle: {
    color: '#000000',
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 7,
  },
  usernameContainer: {
    marginTop: 7,
  },
  username: {
    color: '#434343',
    fontSize: 15,
    fontWeight: '700',
  },
})

const ProfileHeader = () => {
  const dispatch = useDispatch()

  const authUser = useSelector((state) => state.auth.user)

  const user = useSelector((state) => state.user)

  const myPosts = useSelector((state) => state.myPosts.posts)

  const [isUploading, setIsUploading] = useState(false)

  const handleUploadComplete = ({ url }) => {
    dispatch(updateUserAction({ avatar: url, token: authUser.token, userId: user.id }))
  }

  const handleProgress = ({ progressData }) => {
    switch (progressData) {
      case progressData > 0 && progressData < 100 && !isUploading:
        setIsUploading(true)
        break
      case progressData === 100 && isUploading:
        setIsUploading(false)
        break
      default:
        break
    }
  }

  return (
    <View style={styles.container}>
      <PhotoUploader
        onProgress={handleProgress}
        onUploadComplete={handleUploadComplete}
        photoDimensions={{
          height: 300,
          width: 300,
        }}>
        <View style={styles.avatarContainer}>
          {user.avatar ? (
            <Image style={styles.avatar} source={{ uri: user.avatar }} />
          ) : (
            <Avatar.Text
              size={45}
              label={user.username ? user.username[0] : 'u'}
              style={styles.avatar}
            />
          )}
          {isUploading && (
            <View style={styles.activityContainer}>
              <ActivityIndicator size="small" color="#D7D0CF" />
            </View>
          )}
        </View>
        <View style={styles.button}>
          <Icon
            color="#FFFFFF"
            name="camera"
            size={18}
            style={{ marginLeft: 1, marginTop: 2, padding: 0 }}
          />
        </View>
      </PhotoUploader>
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{user.username}</Text>
      </View>
      <View style={[styles.positionContainer, {}]}>
        <View style={[styles.statContainer, { flex: 0.6 }]}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={require('../assets/images/icon_wreath_left.png')}
              style={{ height: 46, width: 38 }}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <AlltimeLeaderboardPosition textStyle={styles.statTitle} />
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.statLabel}>
                OVERALL
              </Text>
            </View>
            <Image
              source={require('../assets/images/icon_wreath_right.png')}
              style={{ height: 46, width: 38 }}
            />
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={[styles.statContainer, { flex: 1 }]}>
          <Text style={styles.statTitle}>{user.points}</Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.statLabel}>
            POINTS
          </Text>
        </View>
        <View style={[styles.statContainer, { flex: 1 }]}>
          <Text style={styles.statTitle}>{user.pointsBalance}</Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.statLabel}>
            BALANCE
          </Text>
        </View>
        <View style={[styles.statContainer, { flex: 1 }]}>
          <Text style={styles.statTitle}>{myPosts.length}</Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.statLabel}>
            {`POST${myPosts.length === 1 ? '' : 'S'}`}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ProfileHeader
