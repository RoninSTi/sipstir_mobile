/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux'
import { FETCH_LEADERBOARD, REFRESH_LEADERBOARD } from '../redux/actions/types'

import { Dimensions, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';

import LeaderboardAvatar from '../components/LeaderboardAvatar';
import LeaderboardHeader from '../components/LeaderboardHeader';
import ScreenLoader from '../components/ScreenLoader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    width: Dimensions.get('window').width,
  },
  listDescription: {
    color: '#979797',
    fontSize: 13,
  },
  listItem: {
    backgroundColor: '#FAF3F2',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingVertical: 14,
  },
  listTitle: {
    color: '#434343',
    fontSize: 14,
    fontWeight: '700',
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

const Leaderboard = () => {
  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.ui.isLoading)

  const isRefreshing = useSelector(state => state.leaderboard.isRefreshing)

  const leaders = useSelector(state => state.leaderboard.leaders)

  const user = useSelector(state => state.user)

  const keyExtractor = item => `Leaderboard-${item.id}`;

  const onRefresh = () => {
    dispatch({ type: REFRESH_LEADERBOARD })
  };

  const renderItem = ({ item }) => {
    return (
      <List.Item
        left={() => <LeaderboardAvatar place={item.allTimeLeaderboardPosition} user={item} />}
        description={`${item.points} points`}
        descriptionStyle={styles.listDescription}
        title={item.id === user.id ? 'You!' : item.username}
        titleStyle={styles.listTitle}
        style={styles.listItem}
      />
    );
  };

  renderItem.propTypes = {
    item: PropTypes.shape({
      allTimeLeaderboardPosition: PropTypes.number,
      id: PropTypes.string,
      points: PropTypes.number,
      username: PropTypes.string,
    }).isRequired,
  };

  const loading = isLoading.some(item => item.loadingType === FETCH_LEADERBOARD);

  return (
    <View style={styles.container}>
      <ScreenLoader loading={loading}>
        <FlatList
          data={leaders}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor="#5177FF" />
          }
          renderItem={renderItem}
          ListHeaderComponent={() => <LeaderboardHeader />}
          style={styles.list}
        />
      </ScreenLoader>
    </View>
  );
};

export default Leaderboard;
