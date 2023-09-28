import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { StyleSheet, View, Text } from 'react-native'
import { Button, Modal } from 'react-native-paper'
import { ASK_NOTIFICATION_PERMISSION, SET_SHOW_NOTIFICATION_MODAL } from '../redux/actions/types'

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

const NotificationModal = () => {
  const dispatch = useDispatch()

  const showNotificationModal = useSelector((state) => state.ui.showNotificationModal)

  const onDismiss = () => {
    dispatch({ type: SET_SHOW_NOTIFICATION_MODAL, payload: false })
  }

  const onPressYes = () => {
    dispatch({ type: ASK_NOTIFICATION_PERMISSION })
  }

  return (
    <Modal onDismiss={onDismiss} visible={showNotificationModal}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Enable Push Notifications?</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.bodyText}>
            Would you like to be notified when someone comments or guesses on your snap?
          </Text>
          <View style={styles.buttonContainer}>
            <Button textColor="#5177FF" onPress={onDismiss}>
              Cancel
            </Button>
            <Button buttonColor="#5177FF" mode="contained" onPress={onPressYes} style={styles.yesButton}>
              Yes
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default NotificationModal
