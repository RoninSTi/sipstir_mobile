import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import store from './redux/store';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { Provider as PaperProvider } from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { Buffer } from 'buffer';

global.Buffer = Buffer;

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <ActionSheetProvider>
            <PaperProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar style='light' />
            </PaperProvider>
          </ActionSheetProvider>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
