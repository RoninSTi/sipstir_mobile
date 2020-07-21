import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Avatar from './Avatar';

const styles = StyleSheet.create({
  avatar: {
    marginRight: 7,
  },
  container: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    padding: 14,
    paddingBottom: 28,
  },
  time: {
    color: '#D0D0D0',
    fontSize: 14,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
});

const FeedPostHeader = ({ post }) => {
  const { createdBy } = post;
  const { username } = createdBy;

  const timeString = post.revealed
    ? 'Revealed!'
    : moment().to(moment(post.createdAt).add(12, 'hours'));

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', 'transparent']} style={styles.gradient}>
        <Avatar containerStyle={styles.avatar} user={createdBy} />
        <View style={styles.captionContainer}>
          <View style={styles.headerText}>
            <Text style={styles.username}>{username}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Icon color="#D0D0D0" name="clock" size={14} style={{ marginRight: 4 }} />
            <Text style={styles.time}>{timeString}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

FeedPostHeader.propTypes = {
  post: PropTypes.shape({
    createdAt: PropTypes.string,
    createdBy: PropTypes.shape({
      username: PropTypes.string,
    }),
    revealed: PropTypes.bool,
  }).isRequired,
};

export default FeedPostHeader;
