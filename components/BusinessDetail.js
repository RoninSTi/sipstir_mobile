/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable global-require */
import React, { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import { useNavigation } from '@react-navigation/native'

import { Image, Platform, SectionList, StyleSheet, Text, View } from 'react-native'

import { List } from 'react-native-paper'
import * as Linking from 'expo-linking'

import BusinessDetailHeader from './BusinessDetailHeader'
import LocationMap from './LocationMap'

const styles = StyleSheet.create({
  description: {
    color: '#979797',
  },
  header: {
    color: '#AE9E9C',
    fontSize: 14,
    fontWeight: '500',
    padding: 14,
  },
  listItem: {
    backgroundColor: '#FAF3F2',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    color: '#434343',
    fontWeight: '700',
  },
})

const BusinessDetail = ({ reward }) => {
  const { navigate, setOptions } = useNavigation()

  const { account } = reward

  const { location, name, phone, url } = account

  useLayoutEffect(() => {
    setOptions({ title: name })
  }, [name, setOptions])

  const navigateToBusinessPosts = () => {
    navigate('LocationFeed', {
      locationId: location.id,
      locationName: name,
    })
  }

  const navigateToRewardDetail = () => {
    navigate('RewardDetail', {
      reward,
    })
  }

  const openMap = () => {
    const [lng, lat] = location.geometry.coordinates

    Linking.openURL(
      Platform.select({
        android: `https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`,
        ios: `maps://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`,
      })
    )
  }

  const openPhone = () => {
    Linking.openURL(`tel:${phone}`)
  }

  const openUrl = () => {
    Linking.openURL(url)
  }

  const DATA = [
    {
      title: 'Claim Reward',
      data: [
        {
          key: 'reward',
          render: () =>
            reward ? (
              <List.Item
                description={reward.message}
                descriptionStyle={styles.description}
                left={() => (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      source={require('../assets/images/icon_coupon.png')}
                      style={{ height: 25, width: 32 }}
                    />
                  </View>
                )}
                onPress={navigateToRewardDetail}
                right={(props) => (
                  <List.Icon
                    {...props}
                    color="#E74F46"
                    icon="chevron-right"
                    style={{ marginHorizontal: 0 }}
                  />
                )}
                style={styles.listItem}
                title={reward.title}
                titleStyle={styles.title}
              />
            ) : null,
        },
      ],
    },
    {
      title: 'Posts',
      data: [
        {
          key: 'posts',
          render: () => (
            <List.Item
              onPress={navigateToBusinessPosts}
              right={(props) => (
                <List.Icon
                  {...props}
                  color="#E74F46"
                  icon="chevron-right"
                  style={{ marginHorizontal: 0 }}
                />
              )}
              style={styles.listItem}
              title="All Revealed Posts"
              titleStyle={styles.title}
            />
          ),
        },
      ],
    },
    {
      title: 'Info',
      data: [
        {
          key: 'info-phone',
          render: () => (
            <List.Item
              left={(props) => (
                <List.Icon
                  {...props}
                  color="#B7ADAB"
                  icon="phone"
                  style={{ marginHorizontal: 0 }}
                />
              )}
              onPress={openPhone}
              style={styles.listItem}
              title={phone}
              titleStyle={[styles.title, { color: '#E74F46' }]}
            />
          ),
        },
        {
          key: 'info-url',
          render: () => (
            <List.Item
              left={(props) => (
                <List.Icon {...props} color="#B7ADAB" icon="web" style={{ marginHorizontal: 0 }} />
              )}
              onPress={openUrl}
              style={[styles.listItem, { borderTopWidth: 0 }]}
              title={url}
              titleStyle={[styles.title, { color: '#E74F46' }]}
            />
          ),
        },
      ],
    },
    {
      title: 'Directions',
      data: [
        {
          key: 'directions',
          render: () => <LocationMap location={location} onPress={openMap} />,
        },
      ],
    },
  ]

  const keyExtractor = (item) => item.key

  const renderItem = ({ item }) => item.render()

  return (
    <SectionList
      sections={DATA}
      keyExtractor={keyExtractor}
      ListHeaderComponent={<BusinessDetailHeader account={account} />}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
    />
  )
}

BusinessDetail.defaultProps = {
  reward: null,
}

BusinessDetail.propTypes = {
  reward: PropTypes.shape({
    account: PropTypes.shape({
      location: PropTypes.shape({
        id: PropTypes.number,
        geometry: PropTypes.shape({
          coordinates: PropTypes.arrayOf(PropTypes.any),
        }),
      }).isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
    message: PropTypes.string,
    title: PropTypes.string,
  }),
}

export default BusinessDetail
