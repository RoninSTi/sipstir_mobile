/* eslint-disable global-require */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'

import { Dimensions, Image, ImageBackground, StyleSheet, View, Text } from 'react-native'
import { Button, Modal } from 'react-native-paper'

import GooglePlaceImage from './GooglePlaceImage'
import PointsIcon from './PointsIcon'
import { RESET_GUESS } from '../redux/actions/types'

const { width: WIDTH } = Dimensions.get('window')

const styles = StyleSheet.create({
  accountContainer: {
    position: 'absolute',
    bottom: 14,
    left: 14,
  },
  accountName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  bodyContainer: {
    padding: 28,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    overflow: 'hidden',
    margin: 28,
  },
  headerContainer: {
    backgroundColor: '#F9F9F9',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.05)',
    padding: 14,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  pointsText: {
    color: '#484848',
    fontSize: 28,
    fontWeight: '500',
    marginLeft: 7,
    textAlign: 'center',
  },
  rewardContainer: {
    backgroundColor: '#E8E8E8',
    borderRadius: 14,
    marginVertical: 14,
    padding: 14,
  },
  rewardImageContainer: {
    position: 'relative',
  },
  rewardImage: {
    height: WIDTH - 2 * 28 - 2 * 28,
    width: WIDTH - 2 * 28 - 2 * 28,
  },
  rewardMessage: {
    color: '#484848',
    fontSize: 16,
  },
  rewardTextContainer: {
    marginVertical: 14,
  },
  rewardTitle: {
    color: '#484848',
    fontSize: 18,
    fontWeight: '700',
  },
  vicinity: {
    color: 'white',
  },
  yesButton: {
    borderRadius: 20,
  },
})

const PointsRewardModal = ({ isVisible, post, reward }) => {
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)

  const correct = useSelector((state) => state.createGuess.location?.id === post.location.id)

  const points = useSelector((state) => state.user?.points)

  console.log({ reward })

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setShowModal(true)
      }, 1000)
    }
  }, [isVisible])

  const onDismiss = () => {
    setShowModal(false)

    dispatch({ type: RESET_GUESS })
  }

  return (
    <Modal onDismiss={onDismiss} visible={showModal}>
      <Text style={styles.headerText}>{correct ? 'Correct! 👍' : 'Incorrect! 👎'}</Text>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/button_background.png')}
          style={styles.imageBackground}>
          <View style={styles.iconContainer}>
            <PointsIcon label={correct ? '+5 Points' : '+1 Point'} />
            <Text style={styles.pointsText}>{`You now have ${points} points!`}</Text>
          </View>
          <View style={styles.rewardContainer}>
            <View style={styles.rewardImageContainer}>
              {reward.account.image ? (
                <Image source={{ uri: reward.account.image }} style={styles.rewardImage} />
              ) : (
                <GooglePlaceImage
                  containerStyle={styles.containerStyle}
                  image={reward.account.location.photo}
                />
              )}
              <View style={styles.accountContainer}>
                <Text style={styles.accountName}>{reward.account.name}</Text>
                <Text style={styles.vicinity}>{reward.account.location.vicinity}</Text>
              </View>
            </View>
            <View style={styles.rewardTextContainer}>
              <Text style={styles.rewardTitle}>{reward.reward.title}</Text>
              <Text style={styles.rewardMessage}>{reward.reward.message}</Text>
            </View>
          </View>
          <Button color="#5177FF" mode="contained" onPress={onDismiss} style={styles.yesButton}>
            Continue
          </Button>
        </ImageBackground>
      </View>
    </Modal>
  )
}

PointsRewardModal.defaultProps = {
  isVisible: false,
}

PointsRewardModal.propTypes = {
  isVisible: PropTypes.bool,
  post: PropTypes.shape({
    location: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  reward: PropTypes.shape({
    account: PropTypes.shape({
      image: PropTypes.string,
      location: PropTypes.shape({
        photo: PropTypes.shape({
          photoReference: PropTypes.string,
        }),
        vicinity: PropTypes.string,
      }),
      name: PropTypes.string,
    }),
    reward: PropTypes.shape({
      message: PropTypes.string,
      title: PropTypes.string,
    }),
  }).isRequired,
}

export default PointsRewardModal
