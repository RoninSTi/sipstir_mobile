/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

import { StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator, List } from 'react-native-paper'
import { FETCH_PLACE } from '../redux/actions/types'

const styles = StyleSheet.create({
  description: {
    color: '#979797',
  },
  emojiContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  listItem: {
    backgroundColor: '#FAF3F2',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    color: '#434343',
    fontWeight: '700',
  },
})

const PlacesItem = ({ onPressListItem, place }) => {
  const isLoading = useSelector((state) => state.ui.isLoading)

  const { description, formatted_address: formattedAddress, type } = place

  const shouldShowLoading = isLoading.some((element) => {
    return element.loadingType === FETCH_PLACE && element.meta === place.place_id
  })

  if (type === 'NO_GUESS') {
    return (
      <List.Item
        description="But I want to comment"
        descriptionStyle={styles.description}
        left={() => (
          <View style={styles.emojiContainer}>
            <Text>🧐</Text>
          </View>
        )}
        onPress={() => onPressListItem({ place })}
        right={(props) => (
          <List.Icon
            {...props}
            color="#E74F46"
            icon="chevron-right"
            style={{ marginHorizontal: 0 }}
          />
        )}
        style={styles.listItem}
        title="I have no idea!"
        titleStyle={styles.title}
      />
    )
  }

  let title = ''
  let formattedDescription = ''

  if (description) {
    const descriptionArray = description.split(',')
    const [titleFromDescription] = descriptionArray
    title = titleFromDescription
    descriptionArray.shift()
    descriptionArray[0] = descriptionArray[0].trim()
    formattedDescription = descriptionArray.join(',')
  }

  if (formattedAddress) {
    const { name } = place
    title = name
    formattedDescription = formattedAddress
  }

  return (
    <List.Item
      description={formattedDescription}
      left={(props) =>
        shouldShowLoading ? (
          <ActivityIndicator color="#D7D0CF" size={24} style={{ marginHorizontal: 8 }} />
        ) : (
          <List.Icon {...props} color="#CFCFCF" icon="map-marker" style={{ marginHorizontal: 0 }} />
        )
      }
      onPress={() => onPressListItem({ place })}
      right={(props) => (
        <List.Icon
          {...props}
          color="#E74F46"
          icon="chevron-right"
          style={{ marginHorizontal: 0 }}
        />
      )}
      style={styles.listItem}
      title={title}
      titleNumberOfLines={2}
      titleStyle={styles.title}
    />
  )
}

PlacesItem.propTypes = {
  onPressListItem: PropTypes.func.isRequired,
  place: PropTypes.shape({
    description: PropTypes.string,
    formatted_address: PropTypes.string,
    name: PropTypes.string,
    place_id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
}

export default PlacesItem
