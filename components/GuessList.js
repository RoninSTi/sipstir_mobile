import React from 'react';

import { StyleSheet, View } from 'react-native';

import Guess from './Guess';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    flex: 1,
    paddingTop: 14,
  },
})

const GuessList = ({ guesses }) => {
  return (
    <View style={styles.container}>
      {guesses.map(guess => <Guess guess={guess} key={`guessList-${guess.id}`} />)}
    </View>
  )
}

export default GuessList;
