/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import { Image, StyleSheet } from 'react-native'
import { List } from 'react-native-paper'

import { useNavigation } from '@react-navigation/native'

import GooglePlaceImage from './GooglePlaceImage'

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

const RedemptionItem = ({ redemption }) => {
  const { createdAt, reward } = redemption
  const { account, title } = reward
  const { image, location, name } = account
  const { photo } = location

  const { navigate } = useNavigation()

  const onPress = () => {
    navigate('Business', {
      screen: 'BusinessDetailScreen',
      params: {
        reward,
      },
    })
  }

  return (
    <List.Item
      description={moment(createdAt).fromNow()}
      descriptionStyle={styles.description}
      left={() =>
        image ? (
          <Image
            source={{ uri: `${image}?w=60&h=60&fit=crop` }}
            style={{ height: 60, marginHorizontal: 8, width: 60 }}
          />
        ) : (
          <GooglePlaceImage image={photo} height={60} containerStyle={{ marginHorizontal: 0 }} />
        )
      }
      onPress={onPress}
      right={(props) => (
        <List.Icon
          {...props}
          color="#E74F46"
          icon="chevron-right"
          style={{ marginHorizontal: 0 }}
        />
      )}
      style={styles.listItem}
      title={`${name} - ${title}`}
      titleNumberOfLines={2}
      titleStyle={styles.title}
    />
  )
}

RedemptionItem.propTypes = {
  redemption: PropTypes.shape({
    createdAt: PropTypes.string,
    reward: PropTypes.shape({
      account: PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        location: PropTypes.shape({
          photo: PropTypes.shape({}),
          vicinity: PropTypes.string,
        }),
        name: PropTypes.string,
      }),
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  }).isRequired,
}

export default RedemptionItem
