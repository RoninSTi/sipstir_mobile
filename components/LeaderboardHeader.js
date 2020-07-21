/* eslint-disable global-require */
import React from 'react';

import { useSelector } from 'react-redux'

import { Image, StyleSheet, Text, View } from 'react-native';

import AlltimeLeaderboardPosition from './AlltimeLeaderboardPosition';
import LeaderboardHeaderAvatar from './LeaderboardHeaderAvatar';

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#F3EBEA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
  },
  metaContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 14,
  },
  placeText: {
    color: '#B7ADAB',
    fontSize: 11,
  },
  statLabel: {
    color: '#B7ADAB',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.5,
  },
  statTitle: {
    color: '#4D423C',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 7,
  },
  youText: {
    color: '#4D423C',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 7,
  },
});

const LeaderboardHeader = () => {
  const { points } = useSelector(state => state.user)

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <LeaderboardHeaderAvatar />
        <View style={styles.metaContainer}>
          <Text style={styles.youText}>You!</Text>
          <Text style={styles.placeText}>{`${points} points`}</Text>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <Image
            source={require('../assets/images/icon_wreath_left.png')}
            style={{ height: 46, tintColor: '#AEA1A0', width: 38 }}
          />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <AlltimeLeaderboardPosition textStyle={styles.statTitle} />
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.statLabel}>
              OVERALL
            </Text>
          </View>
          <Image
            source={require('../assets/images/icon_wreath_right.png')}
            style={{
              height: 46,
              tintColor: '#AEA1A0',
              width: 38,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default LeaderboardHeader;
