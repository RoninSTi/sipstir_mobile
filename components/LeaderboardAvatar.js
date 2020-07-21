import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View } from 'react-native';

import Avatar from './Avatar';

const styles = StyleSheet.create({
  avatarContainer: {
    marginHorizontal: 14,
  },
  avatarPlace: {
    alignItems: 'center',
    backgroundColor: '#5177FF',
    borderColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    left: -7,
    overflow: 'hidden',
    position: 'absolute',
    top: -7,
    height: 20,
    width: 20,
  },
  placeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    textAlign: 'center',
  },
});

const LeaderboardAvatar = ({ place, user }) => {
  const placeStyle = () => {
    switch (place) {
      case 1:
        return {
          backgroundColor: '#F2C94C',
        };
      case 2:
        return {
          backgroundColor: '#BDC1CE',
        };
      case 3:
        return {
          backgroundColor: '#BF9666',
        };
      default:
        return {
          backgroundColor: '#E74F46',
        };
    }
  };

  return (
    <View style={styles.avatarContainer}>
      <Avatar user={user} />
      <View style={[styles.avatarPlace, placeStyle()]}>
        <Text style={styles.placeText}>{place}</Text>
      </View>
    </View>
  );
};

LeaderboardAvatar.propTypes = {
  place: PropTypes.number.isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default LeaderboardAvatar;
