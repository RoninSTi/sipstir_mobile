/* eslint-disable react/style-prop-object */
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Provider } from 'react-redux'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { Buffer } from 'buffer'
import store from './redux/store'

import useCachedResources from './hooks/useCachedResources'
import AppContainer from './components/AppContainer'

global.Buffer = Buffer

const theme = {
  ...DefaultTheme,
}

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  }
  return (
    <Provider store={store} theme={theme}>
      <SafeAreaProvider>
        <ActionSheetProvider>
          <PaperProvider>
            <AppContainer />
          </PaperProvider>
        </ActionSheetProvider>
      </SafeAreaProvider>
    </Provider>
  )
}
