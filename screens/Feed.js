/* eslint-disable global-require */
import React, { useEffect, useRef } from 'react';

import { useRoute } from '@react-navigation/native';

import { StyleSheet, View } from 'react-native';

import BackgroundHeader from '../components/BackgroundHeader';
// import FeedSelector from '@components/FeedSelector';
import HeaderTitle from '../components/HeaderTitle';
import PostList from '../components/PostList';
import ScreenLoader from '../components/ScreenLoader';

import { useDispatch, useSelector } from 'react-redux';
import { FETCH_FEED, REFRESH_FEED } from '../redux/actions/types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6EB',
    flex: 1,
  },
});

const FeedScreen = () => {
  const dispatch = useDispatch();

  const postListRef = useRef(null);

  const route = useRoute();

  const isLoading = useSelector(state => state.ui.isLoading)

  const isRefreshing = useSelector(state => state.feed.isRefreshing)

  const posts = useSelector(state => state.feed.posts)

  const action = route.params?.action;

  // useEffect(() => {
  //   if (shouldScrollUp) {
  //     postListRef.current.scrollUp();

  //     setShouldScrollUp(false);
  //   }
  // }, [shouldScrollUp]);

  useEffect(() => {
    switch (action) {
      case 'scrollUp':
        postListRef.current.scrollUp();
        break;
      default:
        break;
    }
  }, [action]);

  const onRefresh = () => {
    dispatch({ type: REFRESH_FEED })
  };

  const isLoadingFeed = isLoading.some(item => item.loadingType === FETCH_FEED);

  return (
    <View style={styles.container}>
      <ScreenLoader loading={isLoadingFeed}>
        <PostList
          detailPath="Detail"
          onRefresh={onRefresh}
          posts={posts}
          ref={postListRef}
          refreshing={isRefreshing}
        />
      </ScreenLoader>
    </View>
  );
};

FeedScreen.navigationOptions = () => ({
  headerBackground: () => <BackgroundHeader />,
  headerBackTitle: null,
  headerStyle: {
    backgroundColor: 'rgba(231, 73, 62, 0.98)',
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerTitle: () => <HeaderTitle />,
});

export default FeedScreen;
