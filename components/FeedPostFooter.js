/* eslint-disable global-require */
import React from 'react'
import PropTypes from 'prop-types'

import { useNavigation } from '@react-navigation/native'

import { useDispatch, useSelector } from 'react-redux'

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { ActivityIndicator } from 'react-native-paper'
import { fetchLocationDetailsAction } from '../redux/actions/places'
import { ATTEMPT_GUESS, FETCH_LOCATION_DETAILS } from '../redux/actions/types'

import BackgroundButton from './BackgroundButton'
import CheersButton from './CheersButton'

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: '#EFEFEF',
    borderRadius: 20,
    flexShrink: 1,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  button: {
    borderRadius: 22,
    padding: 5,
  },
  caption: {
    color: '#222222',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: '700',
    paddingLeft: 8,
  },
  cheersText: {
    marginRight: 14,
  },
  guessContainer: {
    marginTop: 14,
  },
  locationContainer: {
    padding: 21,
    backgroundColor: '#F8F8FA',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    flexDirection: 'row',
  },
  locationName: {
    color: '#5D5D5F',
    fontSize: 16,
    fontWeight: '700',
  },
  locationMeta: {
    justifyContent: 'center',
  },
  locationVicinity: {
    color: '#9C9C9C',
    fontSize: 14,
  },
  metaText: {
    color: '#A6A6A6',
    fontSize: 13,
    fontWeight: '700',
  },
  metaContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
  },
  metaData: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 7,
  },
})

const FeedPostFooter = ({ detailPath, isDetail, post }) => {
  const dispatch = useDispatch()

  const { navigate } = useNavigation()

  const user = useSelector((state) => state.user)

  const token = useSelector((state) => state.auth.user?.token)

  const isLoadingDetails = useSelector((state) =>
    state.ui.isLoading.some(
      ({ loadingType, meta }) => loadingType === FETCH_LOCATION_DETAILS && meta === post.location.id
    )
  )

  const { caption, id: postId, cheers, guesses = [], isGuessed } = post

  const isOwner = user.id === post.createdById

  const onPressCheersLabel = () => {
    navigate('PostCheers', { postId })
  }

  const showGuess = !post.revealed && !isOwner && !isGuessed

  const showLocation = isDetail || post.revealed

  // const showLocation = true

  // const showGuess = true

  const onPressGuess = () => {
    const params = {
      postId: post.id,
      showPointsModal: false,
    }

    if (showGuess) {
      dispatch({ type: ATTEMPT_GUESS, payload: params })
    } else {
      navigate(detailPath, params)
    }
  }

  const onPressLocation = () => {
    dispatch(fetchLocationDetailsAction({ locationId: post.location.id, token }))
  }

  return (
    <View>
      <View style={styles.metaContainer}>
        <CheersButton post={post} />
        <View style={styles.metaData}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={onPressCheersLabel}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/images/icon_cheers_dark.png')}
                style={{ marginRight: 6, width: 23, height: 19, tintColor: '#C8C8C8' }}
              />
              <Text style={[styles.metaText, styles.cheersText]}>{cheers}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressGuess}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/images/icon_guess_small.png')}
                style={{ marginRight: 6, width: 17, height: 19 }}
              />
              <Text style={styles.metaText}>{guesses.length}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {caption ? (
        <View style={{ flexDirection: 'row', paddingBottom: 14, paddingHorizontal: 21 }}>
          <View style={styles.bubble}>
            <Text style={styles.caption}>{caption}</Text>
          </View>
        </View>
      ) : null}
      {showLocation && (
        <TouchableOpacity onPress={onPressLocation} style={styles.locationContainer}>
          {isLoadingDetails ? (
            <ActivityIndicator color="#5177FF" size="small" />
          ) : (
            <Icon color="#CFCFCF" name="map-marker" size={36} style={{ margin: 0, padding: 0 }} />
          )}
          <View style={styles.locationMeta}>
            <Text style={styles.locationName}>{post.location.name}</Text>
            <Text style={styles.locationVicinity}>{post.location.vicinity}</Text>
          </View>
        </TouchableOpacity>
      )}
      {showGuess && (
        <View style={styles.locationContainer}>
          <BackgroundButton
            icon={() => (
              <Image
                source={require('../assets/images/icon_guess_large.png')}
                style={{ height: 24, marginRight: 7, width: 20 }}
              />
            )}
            onPress={onPressGuess}
            source={require('../assets/images/button_background.png')}
            title="Guess"
          />
        </View>
      )}
    </View>
  )
}

FeedPostFooter.defaultProps = {
  detailPath: 'Detail',
  isDetail: false,
}

FeedPostFooter.propTypes = {
  detailPath: PropTypes.string,
  isDetail: PropTypes.bool,
  post: PropTypes.shape({
    caption: PropTypes.string,
    cheers: PropTypes.number,
    createdBy: PropTypes.shape({
      username: PropTypes.string,
    }),
    createdById: PropTypes.number,
    guesses: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number,
    isCheered: PropTypes.bool,
    isGuessed: PropTypes.bool,
    location: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      vicinity: PropTypes.string,
    }),
    revealed: PropTypes.bool,
  }).isRequired,
}

export default FeedPostFooter
