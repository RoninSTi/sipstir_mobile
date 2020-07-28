/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Provider } from 'react-redux'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { DefaultTheme, Provider as PaperProvider, Portal } from 'react-native-paper'
import { Buffer } from 'buffer'
import store from './redux/store'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'

import Navigation from './navigation'

import FollowTray from './components/FollowTray'
import LocationModal from './components/LocationModal'
import NotificationModal from './components/NotificationModal'

global.Buffer = Buffer

const theme = {
  ...DefaultTheme,
}

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  }
  return (
    <Provider store={store} theme={theme}>
      <SafeAreaProvider>
        <ActionSheetProvider>
          <PaperProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar style="light" />
            <FollowTray />
            <Portal>
              <LocationModal />
              <NotificationModal />
            </Portal>
          </PaperProvider>
        </ActionSheetProvider>
      </SafeAreaProvider>
    </Provider>
  )
}
