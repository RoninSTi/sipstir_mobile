import React from 'react'
import PropTypes from 'prop-types'

import { Dimensions, StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
  },
  map: {
    borderRadius: 28,
    width: Dimensions.get('window').width - 28,
    height: 125,
    overflow: 'hidden',
  },
})

const LocationMap = ({ location, onPress }) => {
  const [lng, lat] = location.geometry.coordinates

  const region = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.005,
    longitudeDelta: 0.01,
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={region}
        onPress={onPress}
        scrollEnabled={false}
        style={styles.map}
        zoomEnabled={false}>
        <Marker coordinate={{ latitude: lat, longitude: lng }} />
      </MapView>
    </View>
  )
}

LocationMap.defaultProps = {
  onPress: () => {},
}

LocationMap.propTypes = {
  location: PropTypes.shape({
    geometry: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
  }).isRequired,
  onPress: PropTypes.func,
}

export default LocationMap
