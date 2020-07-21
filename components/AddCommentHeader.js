/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LocationMap from './LocationMap';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 14,
    paddingRight: 7,
  },
  text: {
    color: '#9C9C9C',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 14,
  },
  name: {
    color: '#5D5D5F',
    fontSize: 14,
    fontWeight: '700',
  },
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});

const AddCommentHeader = ({ selectedPlace }) => {
  const { goBack } = useNavigation();

  const onPress = () => {
    goBack();
  };

  return (
    <View style={styles.wrapper}>
      {selectedPlace && (
        <View>
          <View style={styles.container}>
            <View style={styles.infoContainer}>
              <View style={styles.iconContainer}>
                <Icon color="#D8D8D8" name="map-marker" size={30} />
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.text, styles.name]}>{selectedPlace.name}</Text>
                <Text style={[styles.text]}>{selectedPlace.vicinity}</Text>
              </View>
              <Button color="#E85349" onPress={onPress}>
                Change
              </Button>
            </View>
          </View>
          <LocationMap location={selectedPlace} />
        </View>
      )}
      {!selectedPlace && (
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <View style={styles.iconContainer}>
              <Icon color="#D8D8D8" name="map-marker" size={30} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.emoji}>🤷‍♂️</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default AddCommentHeader;
