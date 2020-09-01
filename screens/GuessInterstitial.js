/* eslint-disable global-require */
import React, { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'

import { CommonActions, useRoute } from '@react-navigation/native'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { RESET_GUESS } from '../redux/actions/types'
import { dispatch as navDispatch } from '../navigation/rootNavigation'

import AccountImage from '../components/AccountImage'
import BackgroundButton from '../components/BackgroundButton'

const { width: WIDTH } = Dimensions.get('window')

const IMAGE_HEIGHT = WIDTH - 56

const IMAGE_WIDTH = WIDTH - 56

const styles = StyleSheet.create({
  accountContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    bottom: 0,
    left: 0,
    padding: 14,
    position: 'absolute',
    right: 0,
  },
  accountName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  accountVicinity: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  adContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    marginBottom: 28,
    overflow: 'hidden',
  },
  adMessage: {
    color: '#928C88',
    fontSize: 16,
  },
  adTextContainer: {
    padding: 14,
  },
  adTitle: {
    color: '#65615E',
    fontSize: 18,
    fontWeight: '700',
  },
  container: {
    padding: 28,
  },
  imageContainer: {
    position: 'relative',
  },
  points: {
    color: '#928C88',
    fontSize: 14,
    marginBottom: 14,
  },
  pointsContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 14,
  },
  pointsNumber: {
    fontWeight: '700',
  },
  sponsored: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    left: 14,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    top: 14,
  },
  title: {
    color: '#928C88',
    fontSize: 24,
    fontWeight: '700',
  },
  titleContainer: {
    marginBottom: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const GuessInterstitial = ({ navigation }) => {
  const dispatch = useDispatch()

  const route = useRoute()

  const postId = route.params?.postId

  const post = useSelector((state) =>
    state.feed.posts[state.feed.feedType].find((p) => p.id === postId)
  )

  const reward = route.params?.reward?.reward

  const account = route.params?.reward?.account

  const correct = useSelector((state) => state.createGuess.location?.id === post.location.id)

  const points = useSelector((state) => state.user?.points)

  useLayoutEffect(() => {
    navigation.setOptions({ title: correct ? 'CORRECT!' : 'INCORRECT!' })
  }, [correct, navigation])

  const handleContinue = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'Feed',
          screen: 'Feed',
        },
        {
          name: 'Detail',
          params: { postId: post.id },
        },
      ],
    })

    navDispatch(resetAction)

    dispatch({ type: RESET_GUESS })
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`🎉 +${correct ? 5 : 1} Points`}</Text>
      </View>
      <View style={styles.adContainer}>
        <View style={styles.imageContainer}>
          <AccountImage account={account} height={IMAGE_HEIGHT} width={IMAGE_WIDTH} />
          <Text style={styles.sponsored}>SPONSORED</Text>
          <View style={styles.accountContainer}>
            <Text style={styles.accountName}>{account.name}</Text>
            <Text style={styles.accountVicinity}>{account.location.vicinity}</Text>
          </View>
        </View>
        <View style={styles.adTextContainer}>
          <Text style={styles.adTitle}>{reward.title}</Text>
          <Text style={styles.adMessage}>{reward.message}</Text>
        </View>
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>
          You now have <Text style={styles.pointsNumber}>{points}</Text> points!
        </Text>
        <BackgroundButton
          onPress={handleContinue}
          source={require('../assets/images/button_background.png')}
          title="Continue"
        />
      </View>
    </View>
  )
}

GuessInterstitial.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
  }).isRequired,
}

export default GuessInterstitial
