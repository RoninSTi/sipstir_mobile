import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import {
  Animated,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  ViewPropTypes,
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import FeedPostContainer from './FeedPostContainer'
import PostSeparator from './PostSeparator'
import { SET_SHOULD_SCROLL_UP } from '../redux/actions/types'

const { width } = Dimensions.get('window')

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6EB',
    overflow: 'visible',
    width,
  },
})

const PostList = ({ containerStyle, detailPath, onRefresh, onScroll, posts, refreshing }) => {
  const dispatch = useDispatch()

  const listRef = useRef(null)

  const scrollUp = () => {
    if (posts.length > 0) {
      listRef.current?.scrollToOffset({ animated: true, offset: 0 })

      dispatch({ type: SET_SHOULD_SCROLL_UP, payload: false })
    }
  }

  const shouldScrollUp = useSelector((state) => state.feed.shouldScrollUp)

  useEffect(() => {
    if (shouldScrollUp) {
      scrollUp()
    }
  }, [shouldScrollUp])

  const keyExtractor = (item) => `Post-${item.id}`

  // eslint-disable-next-line react/prop-types
  const renderItem = ({ item }) => {
    return <FeedPostContainer detailPath={detailPath} post={item} />
  }

  return (
    <AnimatedFlatList
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

PostList.defaultProps = {
  containerStyle: {},
}

PostList.propTypes = {
  containerStyle: ViewPropTypes.style,
  detailPath: PropTypes.string.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onScroll: PropTypes.shape({}).isRequired,
  refreshing: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default PostList
