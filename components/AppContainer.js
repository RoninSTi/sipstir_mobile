/* eslint-disable react/style-prop-object */
import React, { useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { StatusBar } from 'expo-status-bar'
import DropdownAlert from 'react-native-dropdownalert'
import { Portal } from 'react-native-paper'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import useColorScheme from '../hooks/useColorScheme'

import Navigation from '../navigation'

import FollowTray from './FollowTray'
import LocationModal from './LocationModal'
import NotificationModal from './NotificationModal'

import { RESET_DROPDOWN_DATA } from '../redux/actions/types'

const AppContainer = () => {
  const colorScheme = useColorScheme()

  const dispatch = useDispatch()

  const dropdownAlertRef = useRef(null)

  const dropdownAlertData = useSelector((state) => state.ui.dropdownData)

  const showDropdownAlert = useSelector((state) => state.ui.showDropdownAlert)

  useEffect(() => {
    if (showDropdownAlert) {
      const { alertType, message, title } = dropdownAlertData
      dropdownAlertRef.current.alertWithType(alertType, title, message)
    }
  }, [dropdownAlertData, dropdownAlertRef, showDropdownAlert])

  const onCloseDropdown = () => {
    dispatch({ type: RESET_DROPDOWN_DATA })
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation colorScheme={colorScheme} />
      <StatusBar style="light" />
      <DropdownAlert closeInterval={10000} onClose={onCloseDropdown} ref={dropdownAlertRef} />
      <FollowTray />
      <Portal>
        <LocationModal />
        <NotificationModal />
      </Portal>
    </GestureHandlerRootView>
  )
}

export default AppContainer
