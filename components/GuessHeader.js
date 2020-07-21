/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';

import { Image, StyleSheet, Text, View } from 'react-native';

import GooglePlaceImage from './GooglePlaceImage';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 14,
    paddingRight: 14,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
  },
  star: {
    height: 23,
    width: 26,
    position: 'absolute',
    top: 7,
    left: 4,
  },
  wrapper: {
    backgroundColor: '#333333',
  },
});

const GuessHeader = ({ guess }) => {
  const { location } = guess;

  return (
    <View style={styles.wrapper}>
      <View style={styles.infoContainer}>
        <View
          style={{
            flex: 0,
            width: 66,
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/images/icon_guess_transparent.png')}
            style={{ width: 37, height: 42 }}
          />
          {guess.correct && (
            <Image source={require('../assets/images/icon_star.png')} style={styles.star} />
          )}
        </View>
        <View style={styles.textContainer}>
          {location && (
            <>
              <Text style={[styles.text, styles.name]}>{location.name}</Text>
              <Text style={[styles.text]}>{location.vicinity}</Text>
            </>
          )}
          {!location && <Text style={{ fontSize: 24 }}>🤷‍♂️</Text>}
        </View>
        {location && location.photo && (
          <View style={{ flex: 0, height: '100%', width: 66 }}>
            <GooglePlaceImage
              containerStyle={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}
              image={location.photo}
            />
          </View>
        )}
      </View>
    </View>
  );
};

GuessHeader.propTypes = {
  guess: PropTypes.shape({
    correct: PropTypes.bool,
    location: PropTypes.shape({
      name: PropTypes.string,
      photo: PropTypes.object,
      vicinity: PropTypes.string,
    }),
  }).isRequired,
};

export default GuessHeader;
