/* eslint-disable global-require */
import React from 'react'
import PropTypes from 'prop-types'

import { useNavigation } from '@react-navigation/native'

import { useDispatch, useSelector } from 'react-redux'

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { cheersPostAction } from '../redux/actions/post'
import { ATTEMPT_GUESS, CHEERS_POST } from '../redux/actions/types'

import BackgroundButton from './BackgroundButton'

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
  cheersButton: {
    padding: 0,
    borderRadius: 20,
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: '700',
    paddingLeft: 8,
  },
  cheersLabel: {
    fontSize: 12,
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

const FeedPostFooter = ({ detailPath, post }) => {
  const dispatch = useDispatch()

  const { navigate } = useNavigation()

  const isLoading = useSelector((state) => state.ui.isLoading)

  const user = useSelector((state) => state.user)

  const authUser = useSelector((state) => state.auth.user)

  const { caption, id: postId, cheers, guesses = [], isCheered, isGuessed } = post

  const isOwner = user.id === post.createdById

  const onPressCheers = () => {
    dispatch(cheersPostAction({ createdById: user.id, postId, token: authUser.token }))
  }

  const onPressCheersLabel = () => {
    navigate('PostCheers', { postId })
  }

  const showGuess = !post.revealed && !isOwner && !isGuessed

  const showLocation = post.revealed || isGuessed || user.id === post.createdById

  // const showGuess = true;

  const onPressGuess = () => {
    const params = {
      postId: post.id,
      username: post.createdBy.username,
    }
    if (showGuess) {
      dispatch({ type: ATTEMPT_GUESS, payload: params })
    } else {
      navigate(detailPath, params)
    }
  }

  return (
    <View>
      <View style={styles.metaContainer}>
        <Button
          color="#676767"
          compact
          disabled={isLoading.some(
            (item) => item.loadingType === CHEERS_POST && item.meta === post.id
          )}
          icon={() => (
            <Image
              source={require('../assets/images/icon_cheers_dark.png')}
              style={{
                width: 20,
                height: 16,
                tintColor: isCheered ? '#5177FF' : '#676767',
              }}
            />
          )}
          labelStyle={styles.cheersLabel}
          onPress={onPressCheers}
          style={styles.cheersButton}
          uppercase={false}>
          Cheers!
        </Button>
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
      {caption && (
        <View style={{ flexDirection: 'row', paddingBottom: 14, paddingHorizontal: 21 }}>
          <View style={styles.bubble}>
            <Text style={styles.caption}>{caption}</Text>
          </View>
        </View>
      )}
      {showLocation && (
        <View style={styles.locationContainer}>
          <Icon color="#CFCFCF" name="map-marker" size={36} style={{ margin: 0, padding: 0 }} />
          <View style={styles.locationMeta}>
            <Text style={styles.locationName}>{post.location.name}</Text>
            <Text style={styles.locationVicinity}>{post.location.vicinity}</Text>
          </View>
        </View>
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
}

FeedPostFooter.propTypes = {
  detailPath: PropTypes.string,
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
      name: PropTypes.string,
      vicinity: PropTypes.string,
    }),
    revealed: PropTypes.bool,
  }).isRequired,
}

export default FeedPostFooter
