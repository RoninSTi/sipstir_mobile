import React from 'react'
import PropTypes from 'prop-types'

import { StyleSheet, View } from 'react-native'

import Post from './Post'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
  },
  postContainer: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
  },
})

const FeedPostContainer = ({ detailPath, post }) => {
  return (
    <View style={styles.container}>
      <View style={styles.shadowContainer}>
        <View style={styles.postContainer}>
          <Post detailPath={detailPath} post={post} />
        </View>
      </View>
    </View>
  )
}

FeedPostContainer.defaultProps = {
  detailPath: '',
}

FeedPostContainer.propTypes = {
  detailPath: PropTypes.string,
  post: PropTypes.shape({}).isRequired,
}

export default FeedPostContainer
