import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Animated, Dimensions, FlatList, RefreshControl, StyleSheet } from 'react-native'

import FeedPostContainer from './FeedPostContainer'
import PostSeparator from './PostSeparator'

const { width } = Dimensions.get('window')

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E6EB',
    overflow: 'visible',
    width,
  },
})

class PostList extends Component {
  scrollUp = () => {
    this.listRef.scrollToIndex({ animated: true, index: 0 })
  }

  keyExtractor = (item) => `Post-${item.id}`

  renderItem = ({ item }) => {
    const { detailPath } = this.props

    return <FeedPostContainer detailPath={detailPath} post={item} />
  }

  render() {
    const { onRefresh, onScroll, refreshing, posts } = this.props

    return (
      <AnimatedFlatList
        contentContainerStyle={{ paddingVertical: 21 }}
        data={posts}
        ItemSeparatorComponent={() => <PostSeparator />}
        keyExtractor={this.keyExtractor}
        onScroll={onScroll}
        ref={(ref) => {
          this.listRef = ref
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#5177FF" />
        }
        renderItem={this.renderItem}
        style={styles.container}
      />
    )
  }
}

PostList.propTypes = {
  detailPath: PropTypes.string.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onScroll: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default PostList
