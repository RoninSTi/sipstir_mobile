import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Keyboard, StyleSheet, View, Text } from 'react-native'
import { Button, Modal } from 'react-native-paper'

import { ASK_LOCATION_PERMISSION, SET_ASKED_LOCATION_PERMISSION } from '../redux/actions/types'

const styles = StyleSheet.create({
  bodyContainer: {
    padding: 28,
  },
  bodyText: {
    color: '#979797',
    fontSize: 14,
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
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  yesButton: {
    borderRadius: 20,
  },
})

const LocationModal = () => {
  const dispatch = useDispatch()

  const isLoading = useSelector((state) => state.ui.isLoading)

  const showLocationModal = useSelector((state) => state.places.showLocationModal)

  useEffect(() => {
    if (showLocationModal) Keyboard.dismiss()
  }, [showLocationModal])

  const onDismiss = () => {
    dispatch({ type: SET_ASKED_LOCATION_PERMISSION })
  }

  const onPressYes = async () => {
    dispatch({ type: ASK_LOCATION_PERMISSION })
  }

  return (
    <Modal onDismiss={onDismiss} visible={showLocationModal}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Enable Location Services?</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.bodyText}>
            Enabling location allows us to suggest bars and restaurants near you for a better
            experience.
          </Text>
          <View style={styles.buttonContainer}>
            <Button textColor="#5177FF" onPress={onDismiss}>
              Cancel
            </Button>
            <Button
              buttonColor="#5177FF"
              loading={isLoading.some(({ action }) => action === 'locationAsk')}
              mode="contained"
              onPress={onPressYes}
              style={styles.yesButton}>
              Yes
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default LocationModal
