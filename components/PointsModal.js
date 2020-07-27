/* eslint-disable global-require */
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { ImageBackground, StyleSheet, View, Text } from 'react-native'
import { Button, Modal } from 'react-native-paper'

import PointsIcon from './PointsIcon'
import { RESET_GUESS } from '../redux/actions/types'

const styles = StyleSheet.create({
  bodyContainer: {
    padding: 28,
  },
  bodyText: {
    color: '#979797',
    fontSize: 14,
    marginTop: 28,
    marginBottom: 14,
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
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 28,
    textAlign: 'center',
  },
  imageBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  yesButton: {
    borderRadius: 20,
  },
})

const PointsModal = ({ isVisible, post }) => {
  console.log({ isVisible })
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)

  const correct = useSelector((state) => state.createGuess.location?.id === post.location.id)

  const points = useSelector((state) => state.user?.points)

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
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/button_background.png')}
          style={styles.imageBackground}>
          <Text style={styles.headerText}>{correct ? 'Correct! 👍' : 'Incorrect! 👎'}</Text>
          <PointsIcon label={correct ? '+5 Points' : '+1 Point'} />
          <Text style={styles.bodyText}>{`You now have ${points} points!`}</Text>
          <Button color="#5177FF" mode="contained" onPress={onDismiss} style={styles.yesButton}>
            Continue
          </Button>
        </ImageBackground>
      </View>
    </Modal>
  )
}

export default PointsModal
