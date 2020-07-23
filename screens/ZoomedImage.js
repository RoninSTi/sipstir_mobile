import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ImageViewer from 'react-native-image-zoom-viewer'

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    right: 14,
    top: 34,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  imageIndicator: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 50,
    color: 'white',
    fontSize: 16,
  },
})

class ZoomedImageScreen extends Component {
  renderIndicator = (currentIndex, allSize) => {
    if (allSize <= 1) return null
    return (
      <Text style={styles.imageIndicator}>
        {currentIndex}/{allSize}
      </Text>
    )
  }

  onPress = () => {
    const { navigation } = this.props
    const { goBack } = navigation
    goBack(null)
  }

  render() {
    const { route } = this.props
    const url = route.params?.url

    return (
      <SafeAreaView style={styles.container}>
        <ImageViewer maxOverflow={0} renderIndicator={this.renderIndicator} imageUrls={[{ url }]} />
        <TouchableOpacity onPress={this.onPress} style={styles.close}>
          <Icon color="#D8D8D8" name="close" size={30} />
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

ZoomedImageScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
}
export default ZoomedImageScreen
