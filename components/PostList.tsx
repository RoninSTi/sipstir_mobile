import React, { useEffect, useRef } from 'react'

import {
  Animated,
  Dimensions,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import FeedPostContainer from './FeedPostContainer'
import PostSeparator from './PostSeparator'
import { SET_SHOULD_SCROLL_UP } from '../redux/actions/types'
import type { Post } from '../types'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6EB',
    overflow: 'visible',
    width,
  },
})

type Props = {
  containerStyle: object;
  detailPath: string;
  onRefresh: () => {};
  onScroll: () => {};
  posts: Post[];
  refreshing: boolean;
}

const PostList: React.FC<Props> = ({ containerStyle = {}, detailPath, onRefresh, onScroll, posts, refreshing }) => {
  const dispatch = useDispatch()

  const listRef = useRef(null)

  const scrollUp = () => {
    if (posts.length > 0) {
      // @ts-ignore
      listRef.current?.scrollToOffset({ animated: true, offset: 0 })

      dispatch({ type: SET_SHOULD_SCROLL_UP, payload: false })
    }
  }

  // @ts-ignore
  const shouldScrollUp = useSelector((state) => state.feed.shouldScrollUp)

  useEffect(() => {
    if (shouldScrollUp) {
      scrollUp()
    }
  }, [shouldScrollUp])

  const keyExtractor = (item: Post) => `Post-${item.id}`

  const renderItem: ListRenderItem<Post> = (params) => {
    const { item } = params;
    return <FeedPostContainer detailPath={detailPath} post={item} />
  }

  return (
    <Animated.FlatList
      contentContainerStyle={{ paddingVertical: 21 }}
      data={posts}
      ItemSeparatorComponent={() => <PostSeparator />}
      keyExtractor={keyExtractor}
      onScroll={onScroll}
      ref={listRef}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#5177FF" />
      }
      renderItem={renderItem}
      style={[styles.container, containerStyle]}
    />
  )
}

export default PostList
